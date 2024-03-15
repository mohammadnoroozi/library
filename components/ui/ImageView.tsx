import Image from "next/image";
import { ReactElement, useRef, useState } from "react";

interface Props {
  src?: string | undefined,
  alt?: string | undefined,
  className?: string | undefined,
  width?: number | undefined;
  height?: number | undefined;
  ratio?: string | boolean | undefined;
  defaultImage?: ReactElement | undefined;
  priority?: boolean | undefined
}

const shimmer = (w: number | string, h: number | string) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#ccc" offset="20%" />
      <stop stop-color="#eee" offset="50%" />
      <stop stop-color="#ccc" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#ccc" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`

const toBase64 = (str: string) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str)

export default function ImageView({ src, alt, className, width, height, ratio, defaultImage, priority }: Props) {
  const [ratioClassName, setRationClassName] = useState('');
  const imageRef = useRef<HTMLImageElement>(null);
  const shimmerImage = `data:image/svg+xml;base64,${toBase64(shimmer(width ?? "100%", height ?? "100%"))}`

  const style: any = { '--background-image': `url('${shimmerImage}')` };
  if (ratio && ratio !== true) {
    style['--dynamic-ratio'] = `${getRatioPercent(ratio)}%`
  }

  if (!src) {
    if (!ratio) { return defaultImage ?? <></> }
    return <div
      className={`img-box ${className ?? ''}`}
      style={style}
      onResize={() => setRationClassName(getImageBoxClass(imageRef.current))}>
      {defaultImage ?? <></>}
    </div >;
  }

  if (!ratio) return <Image
    src={src}
    alt={alt ?? ""}
    className={className ?? ''}
    blurDataURL={shimmerImage}
    width={width ?? 100}
    height={height ?? 100}
    priority={priority ?? false}
    placeholder='blur'
    loading={priority ? 'eager' : 'lazy'}
  />;

  return <div
    className={`${className ?? ''} img-box`}
    style={style}
    onResize={() => setRationClassName(getImageBoxClass(imageRef.current))}>
    <Image
      ref={imageRef}
      src={src}
      alt={alt ?? ""}
      className={ratioClassName}
      blurDataURL={shimmerImage}
      width={width ?? 100}
      height={height ?? 100}
      priority={priority ?? false}
      placeholder='blur'
      loading={priority ? 'eager' : 'lazy'}
      onLoad={(e) => setRationClassName(getImageBoxClass(e.currentTarget))}
    />
  </div>
}

function getRatioPercent(ratio: string) {
  const ratioParts = ratio.split('-');
  const h = parseInt(ratioParts[0], 10);
  const w = parseInt(ratioParts[1], 10);
  const ratioPercent = Math.round(h / w * 100)
  return ratioPercent
}

function getImageBoxClass(img?: HTMLImageElement | null): string {
  if (!img) return "";
  let parent = img.parentElement;
  if (!parent) return "";
  if (parent?.tagName.toLowerCase() == "picture") {
    parent = parent.parentElement;
  }
  const rect = parent?.getBoundingClientRect();
  const width = rect?.width ?? 0;
  const height = rect?.height ?? 0;
  const ratio = height / width;
  const r = img.naturalHeight / img.naturalWidth;
  if (!r) return "";
  if (r === ratio) return "w-100 h-100";
  if (r > ratio) return "w-100 h-auto mh-auto";
  if (r < ratio) return "h-100 w-auto mw-auto";
  return "";
}
