const moment = require("moment");

module["exports"] = {
    
    isNumber : (val) => {
        return /^[0-9]+$/.test(val);
    },
    isDate : (val) => {
        return /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(val) && 
            moment(val,"YYYY-MM-DD").isValid();
    },
    isDatetime: (val) => {
        return /^[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}$/.test(val) && 
            moment(val,"YYYY-MM-DD HH:mm:ss").isValid();
    }
}