
// https://jdf.scr.ir/jdf/?t=java_script

const gregorianToJalali = (gy: number, gm: number, gd: number): number[] => {
    let jy; let days;
    const gdm = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
    let gyMod = gy;
    if (gyMod > 1600) {
        jy = 979;
        gyMod -= 1600;
    } else {
        jy = 0;
        gyMod -= 621;
    }
    const gy2 = (gm > 2) ? (gyMod + 1) : gyMod;
    days = (365 * gyMod) + (parseInt("" + ((gy2 + 3) / 4), 10))
        - (parseInt("" + ((gy2 + 99) / 100), 10))
        + (parseInt("" + ((gy2 + 399) / 400), 10))
        - 80 + gd + gdm[gm - 1];
    jy += 33 * (parseInt("" + (days / 12053), 10));
    days %= 12053;
    jy += 4 * (parseInt("" + (days / 1461), 10));
    days %= 1461;
    if (days > 365) {
        jy += parseInt("" + ((days - 1) / 365), 10);
        days = (days - 1) % 365;
    }
    const jm = (days < 186) ? 1 + parseInt("" + (days / 31), 10) : 7 + parseInt("" + ((days - 186) / 30), 10);
    const jd = 1 + ((days < 186) ? (days % 31) : ((days - 186) % 30));
    return [jy, jm, jd];
};

export const toPersianDate = (date: string): string => {
    if (!date) return '';
    try {
        const dateObj = new Date(date);
        const pDate = gregorianToJalali(
            dateObj.getFullYear(),
            dateObj.getMonth() + 1,
            dateObj.getDate(),
        );
        return pDate.join('/');
    } catch (error) {
        console.error(error);
        return '???';
    }
};

export const toPersianDateTime = (date: string): string => {
    if (!date) return '';
    try {
        const dateObj = new Date(date);
        const pDate = gregorianToJalali(
            dateObj.getFullYear(),
            dateObj.getMonth() + 1,
            dateObj.getDate(),
        );
        return `${pDate.join('/')} - ${dateObj.getHours()}:${dateObj.getMinutes()}`;
    } catch (error) {
        console.error(error);
        return '??? ??:??';
    }
};
