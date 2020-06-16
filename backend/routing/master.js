const express = require('express')
const router = express.Router()
const ObjectId = require('mongodb').ObjectID;


const shajs = require('sha.js');

const constants = require('../lib/const');
const utils = require('../lib/utils');
const auth = require('../lib/auth');

class RouteConstructor {

    constructor(options){
        this.DBClient = options.DB;
        this.cryptoSecret = options.cryptoSecret;
        this.logger = options.logger;
        this.constructRouter(options.router);
    }
    
    constructRouter(router) {

        /*
            Get master data

            Url : /master/:type [GET]

            Params : model

            Success response : {
                list:[
                    {
                        _id:id,
                        value:value,
                        type:type,
                        created:created
                    }
                ]
            }

            Error response : String

            // test command
            curl -H "Content-type: application/json" 'http://localhost:8082/api/master/type'

        */
            
        router.get('/:type',auth(this.DBClient.getDB()), async (req, res) => {

            try{
                const db = this.DBClient.getDB();

                // check ID valid
                const type = req.params.type;

                if(!type || type.length === 0)
                    return res.status(constants.HttpStatusCodeInvalidParam)
                                .send("Wrong parameter");

                const masterData = await db.collection(constants.CollectionMater).find({
                    type: type
                }).toArray();
                
                res.send({
                    list:masterData
                });

            }catch(e){

                console.log(e);
                this.logger.error(e.message);
                
                return res.status(constants.HttpStatusCodeServerError)
                    .send(e.message);

            }

        });
        
    }

}

module.exports = (param) => {

    new RouteConstructor({
        router:router,
        ...param
    });

    return router
};