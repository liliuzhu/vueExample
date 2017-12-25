/**
 * 解析url参数
 * example ?id=123$a=b
 * */
export function urlParse() {
    let url = window.location.search;
    let obj = {};
    let reg = /[?&][^?&]+=[^?&]+/g;
    let arr = url.match(reg);
    if (arr) {
        arr.forEach((item) => {
            let temArr = item.substring(1).split('=');
            let key = decodeURIComponent(temArr[0]);
            let val = decodeURIComponent(temArr[1]);
            obj[key] = val;
        });
    }
    return obj;
}

/**
 * 解析image_hash
 * */
export function analysismageHash(imageHash = '', isShear = false, rwidth = 130, rheight) {
    let hash = imageHash;
    let width = rwidth;
    let height = rheight || rwidth;
    let extension = imageHash.slice(-4) === 'jpeg' ? imageHash.slice(-4) : imageHash.slice(-3);
    if (!imageHash) {
        return '';
    }
    if (isShear) {
        return `//fuss10.elemecdn.com/${hash.substr(0, 1)}/${hash.substr(1, 2)}/${hash.slice(3)}.${extension}?imageMogr/thumbnail/!${width}x${height}r/gravity/Center/crop/${width}x${height}/`;
    } else {
        return `//fuss10.elemecdn.com/${hash.substr(0, 1)}/${hash.substr(1, 2)}/${hash.slice(3)}.${extension}?imageMogr/format/webp/`;
    }
}

/*
* 打开一个网页
* */
export function openWebWindow(url = '', isReplace = false) {
    if (url) {
        if (isReplace) {
            window.location.replace(url);
        } else {
            window.open(url, "_self");
        }
    }
}
