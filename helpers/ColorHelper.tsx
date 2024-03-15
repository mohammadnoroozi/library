import { padZero } from "./StringHelper";

export function invertHex(hex: string, bw: boolean = true) {
    if (!hex) return hex;
    if (hex.indexOf('#') === 0) {
        hex = hex.slice(1);
    }
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length !== 6) {
        return '#000000';
    }
    const r = parseInt(hex.slice(0, 2), 16),
        g = parseInt(hex.slice(2, 4), 16),
        b = parseInt(hex.slice(4, 6), 16);
    if (bw) {
        return (r * 0.299 + g * 0.587 + b * 0.114) > 186
            ? '#000000'
            : '#FFFFFF';
    }
    const rs = (255 - r).toString(16);
    const gs = (255 - g).toString(16);
    const bs = (255 - b).toString(16);
    return "#" + padZero(rs) + padZero(gs) + padZero(bs);
}

export function getVariant() {
    return "purple";
}
