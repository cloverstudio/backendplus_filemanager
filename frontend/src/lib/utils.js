import moment from 'moment';

export const getRandomString = (length) => {
        
    var text = "";
    var possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    if (!length) {
        length = 32;
    }

    for (var i = 0; i < length; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;

}

export const wait = async (sec) => {

    return new Promise( (res,rej) => {

        setTimeout( () => {

            res();

        },sec * 1000)

    });

}

export const formatDate = (ts) => {
    return moment(ts).format('YYYY/MM/DD hh:mm:ss');
}

export const formatDateShort = (ts) => {
    return moment(ts).format('MMM DD');
}


export const truncate = (str,limit = 20) => {
    if(!str) return "";
    return str.length > limit ? str.substring(0, limit - 7) + "..." : str;
}

export const parseURL = (url) => {
    var parser = document.createElement('a'),
        searchObject = {},
        queries, split, i;
    // Let the browser do the work
    parser.href = url;
    // Convert query string to object
    queries = parser.search.replace(/^\?/, '').split('&');
    for( i = 0; i < queries.length; i++ ) {
        split = queries[i].split('=');
        searchObject[split[0]] = split[1];
    }
    return {
        protocol: parser.protocol,
        host: parser.host,
        hostname: parser.hostname,
        port: parser.port,
        pathname: parser.pathname,
        search: parser.search,
        searchObject: searchObject,
        hash: parser.hash
    };
}

export const filterLowercaseAlphabet = (value) => {
    
    let newVal = "";

    //remove characters which is not alphabet
    for(let i = 0 ; i < value.length ; i++){

        let char = value.substring(i,i+1);

        if(i > 0 && /[a-z0-9_]/.test(char))
            newVal += char;
        if(i == 0 && /[a-z]/.test(char))
            newVal += char;
    }

    return newVal;

}


export const filterNumbert = (value) => {
    
    if(!value) return "";

    console.log("value",value);

    let newVal = "";

    value = value + "";

    //remove characters which is not alphabet
    for(let i = 0 ; i < value.length ; i++){

        let char = value.substring(i,i+1);

        console.log('char',char);
        console.log('/[0-9]/.test(char)',/[0-9]/.test(char));


        if(/[0-9]/.test(char))
            newVal += char;

    }

    console.log('newVal',newVal);
    return newVal;

}

