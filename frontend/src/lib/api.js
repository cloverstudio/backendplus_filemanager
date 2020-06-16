
import * as conf from "./conf";
import * as constants from "./constants";

export default new (class api {

    constructor(){

    }

    async post(path,param) {

        try{
            const token = localStorage.getItem(
                constants.LocalStorageKeyToken
            );

            const header = {
                "Content-Type": "application/json",
            };

            if(token)
                header.token = token;

            console.log('param',param);
            console.log('JSON.stringify(param)',JSON.stringify(param));

            const response = await fetch(conf.baseURL + path,{
                method: "POST",
                mode: "cors",
                cache: "no-cache", 
                credentials: "same-origin",
                headers: header,
                referrer: "no-referrer", // no-referrer, *client
                body: JSON.stringify(param), 
            });
    
            if(response.status == 200){
                const responseBody = await response.json();
                return responseBody;
            }else{
                const responseBody = await response.text();
                return responseBody;
            }

        } catch(e) {

            console.log(e);

        }

    }


    async postMultipart(path,param) {

        try{
            const token = localStorage.getItem(
                constants.LocalStorageKeyToken
            );

            const header = {
            };

            if(token)
                header.token = token;

            const data = new FormData();

            Object.keys(param).map( key => {
                
                const value = param[key] ? param[key] : "";

                if(value && Array.isArray(value)){
                    
                    if(value.length > 0)
                        for(let i = 0 ; i < value.length ; i++ ){
                            const item = value[i];
                            data.append(`${key}[${i}]`, item)
                        }
                    else
                        data.append(`${key}`, [])

                } else if(value && value[0] && value[0].size){ // file
                    
                    for(let i = 0 ; i < value.length ; i++ ){
                        const file = value[i];
                        data.append(`${key}[${i}]`, file)
                    }

                } else {

                    data.append(`${key}`, value)

                }


            });
            

            const response = await fetch(conf.baseURL + path,{
                method: "POST",
                mode: "cors",
                cache: "no-cache", 
                credentials: "same-origin",
                headers: header,
                referrer: "no-referrer", // no-referrer, *client
                body: data, 
            });
    
            if(response.status == 200){
                const responseBody = await response.json();
                return responseBody;
            }else{
                const responseBody = await response.text();
                return responseBody;
            }

        } catch(e) {

            console.log(e);

        }

    }

    async put(path,param) {

        try{

            const token = localStorage.getItem(
                constants.LocalStorageKeyToken
            );

            const header = {
                "Content-Type": "application/json",
            };

            if(token)
                header.token = token;

            const response = await fetch(conf.baseURL + path,{
                method: "PUT",
                mode: "cors",
                cache: "no-cache", 
                credentials: "same-origin",
                headers: header,
                referrer: "no-referrer", // no-referrer, *client
                body: JSON.stringify(param), 
            });
    
            if(response.status == 200){
                const responseBody = await response.json();
                return responseBody;
            }else{
                const responseBody = await response.text();
                return responseBody;
            }

        } catch(e) {

            console.log(e);

        }

    }
    async get(path) {

        try{

            const token = localStorage.getItem(
                constants.LocalStorageKeyToken
            );

            const header = {
                "Content-Type": "application/json",
            };
    
            if(token)
                header.token = token;
    
            const response = await fetch(conf.baseURL + path,{
                method: "GET",
                mode: "cors",
                cache: "no-cache", 
                credentials: "same-origin",
                headers: header,
                referrer: "no-referrer", // no-referrer, *client
            });
    
            const responseBody = await response.json();
    
            return responseBody;
    
        }catch(e){

            console.log(e);

        }

    }

    async delete(path) {

        try{

            const token = localStorage.getItem(
                constants.LocalStorageKeyToken
            );
            
            const header = {
                "Content-Type": "application/json",
            };
    
            if(token)
                header.token = token;
    
            const response = await fetch(conf.baseURL + path,{
                method: "DELETE",
                mode: "cors",
                cache: "no-cache", 
                credentials: "same-origin",
                headers: header,
                referrer: "no-referrer", // no-referrer, *client
            });
    
            if(response.status == 200){
                const responseBody = await response.json();
                return responseBody;
            }else{
                const responseBody = await response.text();
                return responseBody;
            }

        } catch(e) {

            console.log(e);

        }

    }

    async putMultipart(path,param) {

        try{
            const token = localStorage.getItem(
                constants.LocalStorageKeyToken
            );

            const header = {
            };

            if(token)
                header.token = token;

            const data = new FormData();

            Object.keys(param).map( key => {
                
                const value = param[key] ? param[key] : "";

                if(value && Array.isArray(value)){
                    
                    if(value.length > 0)
                        for(let i = 0 ; i < value.length ; i++ ){
                            const item = value[i];
                            data.append(`${key}[${i}]`, item)
                        }
                    else
                        data.append(`${key}`, [])

                } else if(value && value[0] && value[0].size){ // file
                    
                    for(let i = 0 ; i < value.length ; i++ ){
                        const file = value[i];
                        data.append(`${key}[${i}]`, file)
                    }

                } else {

                    data.append(`${key}`, value)

                }

            });
            
            const response = await fetch(conf.baseURL + path,{
                method: "PUT",
                mode: "cors",
                cache: "no-cache", 
                credentials: "same-origin",
                headers: header,
                referrer: "no-referrer", // no-referrer, *client
                body: data, 
            });
    
            if(response.status == 200){
                const responseBody = await response.json();
                return responseBody;
            }else{
                const responseBody = await response.text();
                return responseBody;
            }

        } catch(e) {

            console.log(e);

        }

    }
    

})

