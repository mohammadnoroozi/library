export function iOS() {
  const isIOS =
    [
      "iPad Simulator",
      "iPhone Simulator",
      "iPod Simulator",
      "iPad",
      "iPhone",
      "iPod",
    ].includes(navigator.platform) ||
    // iPad on iOS 13 detection
    (navigator.userAgent.includes("Mac") && "ontouchend" in document);
  return (
    isIOS ||
    (!(window as any).MSStream && /iPad|iPhone|iPod/.test(navigator.userAgent))
  );
}
