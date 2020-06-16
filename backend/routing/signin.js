const express = require('express')
const router = express.Router()

const shajs = require('sha.js');

const config = require('../config');
const constants = require('../lib/const');

const UserModel = require('../models/user');

class RouteConstructor {

    constructor(options){
        this.logger = options.logger;
        this.cryptoSecret = config.cryptoSecret;
        this.constructRouter(options.router);
        
    }
    
    constructRouter(router) {

        router.post('/', async (req, res) => {

            try{

                const connection = await UserModel.getConnection();

                // check param
                const body = req.body;

                if(!body.username || body.username.length === 0)
                    return res.status(constants.HttpStatusCodeInvalidParam)
                                .send("Wrong parameter");

                if(!body.password || body.password.length === 0)
                    return res.status(constants.HttpStatusCodeInvalidParam)
                                .send("Wrong parameter");

                const passwordHash = shajs('sha256').update(body.password + this.cryptoSecret).digest('hex');

                const user = await UserModel.login(
                    connection,
                    body.username,
                    passwordHash
                );

                if(!user){
                    return res.status(constants.HttpStatusCodeUnAuthorise)
                                .send("Invalid password or username");
                }

                res.send({
                    token:user.token,
                    user:{
                        _id:user.id,
                        username: user.username,
                        modified_at: user.modified_at,
                        created_at:user.created_at
                    }
                });

            }catch(e){

                this.logger.error(e.message);
                
                return res.status(constants.HttpStatusCodeServerError)
                    .send(e.message);

            }

        });

        router.post('/checktoken', async (req, res) => {

            try{
                
                // check param
                const body = req.body;

                if(!body.token || body.token.length === 0)
                    return res.status(constants.HttpStatusCodeInvalidParam)
                                .send("Wrong parameter");

                
                const connection = await UserModel.getConnection();

                const user = await UserModel.findOne(
                    connection,
                    {
                        token:body.token
                    }
                );

                if(!user){
                    return res.send({
                        valid:false
                    });
    
                }

                delete user.password;

                res.send({
                    valid:true,
                    user
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