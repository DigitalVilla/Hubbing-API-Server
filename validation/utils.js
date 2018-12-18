const isEmpty = obj => {
    if (obj === undefined || obj === "" || obj === null || obj === {} || obj === [])
        return true;
    for (let key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

module.exports = isEmpty;