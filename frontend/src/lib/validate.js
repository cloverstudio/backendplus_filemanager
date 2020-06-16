import moment from "moment";

export const isNumber = (val) => {
    return /^[0-9]+$/.test(val);
}

export const isDate = (val) => {
    return /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(val) && 
        moment(val,"YYYY-MM-DD").isValid();
}

export const isDatetime =  (val) => {
    return /^[0-9]{4}-[0-9]{2}-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}$/.test(val) && 
        moment(val,"YYYY-MM-DD HH:mm:ss").isValid();
}
