export function padZero(str: string, len?: number) {
    len = len || 2;
    const zeros = new Array(len).join('0');
    return (zeros + str).slice(-len);
}
export function camelCase(str?: string) {
    if (!str) return str;
    return str[0].toLowerCase() + str.substring(1);
}

export function humanize(str?: string) {
    if (!str) return str;
    let result = str[0].toUpperCase();
    for (let i = 1; i < str.length; i++) {
        if (str[i].toUpperCase() === str[i]) {
            result += " ";
        }
        result += str[i]
    }
    return result;
}
