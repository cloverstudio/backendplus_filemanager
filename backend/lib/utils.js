const fs = require("fs");
const path = require("path");
const sharp = require('sharp');
const util = require('util');

const config = require("../config");
const constants = require("./const");

const getRandomString = (length) => {
        
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

const checkImage = (fileName) => {
    return /(png)|(jpg)|(gif)|(jpeg)/i.test(fileName);
}

module["exports"] = {
    
    dump : (obj) => {
        return util.inspect(obj, false, null, true /* enable colors */)
    },
    wait : (sec) => {

        return new Promise( (res,rej) => {

            setTimeout( () => {

                res();

            },sec * 1000)

        });

    },

    now: () => {
        return (new Date()).getTime();
    },

    getRandomString: getRandomString,
    checkImage:checkImage,
    
    parseFileRequest: async (request) => {

        const fields = request.fields;
        const files = request.files;

        const newBody = {};

        Object.keys(fields).map( key => {

            const res = /^(.+)\[(.+)\]$/.exec(key);

            if(res && res.length && res.length > 1){
                const paramName = res[1];
                const paramIndex = res[2];

                if(!newBody[paramName])
                    newBody[paramName] = [];

                newBody[paramName].push(fields[key]);

            } else {

                newBody[key] = fields[key];

            }
            
        });

        Object.keys(files).map( key => {

            const res = /^(.+)\[(.+)\]$/.exec(key);

            if(res && res.length && res.length > 1){

                const paramName = res[1];
                const paramIndex = res[2];

                if(!newBody[paramName])
                    newBody[paramName] = [];

                newBody[paramName].push(files[key]);

            }
            
        });

        // copy files to uploads dir
        Object.keys(newBody).map( key => {

            const param = newBody[key];
    
            if(typeof param == "object" && param.map){ 
    
                newBody[key] = param.map( file => {
        
                    if(file && file.size){

                        const newFileName = (new Date()).getTime() + getRandomString(16);
                        const newPath = path.join(__dirname, "../../", config.uploadsDir) + "/" + newFileName;
            
                        fs.copyFileSync(file.path, newPath);
    
                        const localFilename = newFileName;
    
                        return {
                            size:file.size,
                            name:file.name,
                            type:file.type,
                            localFilename:localFilename
                        };
                        
                    }else{

                        return file;

                    }
        
                });
    
            } else {
                
                return param;

            }
    
        });


        // process images
        const keys = Object.keys(newBody);
        for(let i = 0; i < keys.length ; i++){
            
            const key = keys[i];
            const value = newBody[key];

            if(Array.isArray(value) && value[0] && value[0].name && checkImage(value[0].name)) { // this is a image
                
                for(let ii = 0 ; ii < value.length ; ii++){

                    const file = value[ii];
                    const thumbs = {};

                    await Promise.all(constants.thumbnailSizes.map( async (size) => {

                        const newFileName =  (new Date()).getTime() + getRandomString(16);
                        const destPath = path.join(__dirname, "../../", config.uploadsDir) + "/" + newFileName;
                        const srcPath = path.join(__dirname, "../../", config.uploadsDir) + "/" + file.localFilename;

                        thumbs[size] = newFileName;

                        return await sharp(srcPath)
                            .resize({ width: size, height: size })
                            .toFormat('jpeg')
                            .toFile(destPath);

                    }));

                    file.thumbs = thumbs;

                }

            }

        }

        return newBody;
        
    },


    extractJson:(values) => {

        const newValues = {};

        Object.keys(values).map ( key => {

            const val = values[key];

            if(typeof val == 'object') { //if val is array this returns "object"
                val = JSON.stringify(val);
            }

            newValues[key] = val;

        });
        
    }
}