import dynamic from "next/dynamic";

const Wysiwyg = dynamic(() => import('./UnsafeWysiwyg'), { ssr: false })

export default Wysiwyg;
