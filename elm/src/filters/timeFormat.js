const getTimeStr = (time, format) => {
    if (!isNaN(time)) {
        time = Number(time);
        let oDate = new Date(time);
        let items = {
            'Y': oDate.getFullYear(),
            'M': oDate.getMonth() + 1,
            'D': oDate.getDate(),

            'h': oDate.getHours(),
            'm': oDate.getMinutes(),
            's': oDate.getSeconds()
        };
        let timeStr = format || 'YYYY-MM-DD hh:mm:ss';
        for (let key in items) {
            let reg = new RegExp(`(${key}+)`, '');
            if (reg.test(timeStr)) {
                let temp = '00' + items[key];
                timeStr = timeStr.replace(RegExp.$1, RegExp.$1.length === 1 ? items[key] : temp.substr(temp.length - RegExp.$1.length));
            }
        }
        return timeStr;
    }
    return 'can\'t transform time';
};
export {getTimeStr};
