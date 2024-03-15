import dynamic from "next/dynamic";

const Ace = dynamic(() => import('./UnsafeAce'), { ssr: false })

export default Ace;
