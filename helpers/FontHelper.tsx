export const getFontSrc = (urlList: string[]) => {
    const srcList: string[] = [];

    urlList.forEach(url => {
        const extension = url.substring(url.lastIndexOf('.') + 1);
        srcList.push(`url("${url}") format("${extension}")`);
    });

    return srcList.join(',')
}
export const validateFontFileUpload = (files: FileList) => {
    if (!files || !files.length || files.length < 2) {
        return "woff and woff2";
    }

    let woff = false, woff2 = false;

    Array.from(files).forEach(file => {
        if (file.name.indexOf('.woff') !== -1) {
            woff = true;
        }
        if (file.name.indexOf('.woff2') !== -1) {
            woff2 = true;
        }
    });

    return (woff && woff2) || "woff and woff2";
}
