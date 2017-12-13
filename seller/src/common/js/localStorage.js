export function setLocalSeller(id, key, val) {
    let seller = window.localStorage._seller_;
    if (!seller) {
        seller = {};
        seller[id] = {};
    } else {
        seller = JSON.parse(seller);
        if (!seller[id]) {
            seller[id] = {};
        }
    }
    seller[id][key] = val;
    localStorage._seller_ = JSON.stringify(seller);
}

export function getLocalSeller(id, key, def) {
    let seller = window.localStorage._seller_;
    if (!seller) {
        return def;
    }
    seller = JSON.parse(seller)[id];
    if (!seller) {
        return def;
    }
    let ret = seller[key];
    return ret || def;
}

export function setLocalCartMAp(id, val) {
    let seller = window.localStorage._CART_MAP_;
    if (!seller) {
        seller = {};
    } else {
        seller = JSON.parse(seller);
    }
    seller[id] = val;
    localStorage._CART_MAP_ = JSON.stringify(seller);
}

export function getLocalCartMAp(id) {
    let seller = window.localStorage._CART_MAP_;
    if (!seller) {
        return [];
    }
    seller = JSON.parse(seller)[id];
    if (!seller) {
        return [];
    }
    return seller;
}
