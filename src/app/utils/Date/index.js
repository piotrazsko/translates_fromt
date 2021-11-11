export default class Times {
    static isToday(date) {
        const d = new Date();
        return d.toDateString() === date.toDateString();
    }

    static isYesterday(date) {
        let d = Date.now();
        d = d - 1000 * 60 * 60 * 24;
        return new Date(d).toDateString() === date.toDateString();
    }
}
