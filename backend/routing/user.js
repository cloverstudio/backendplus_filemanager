const express = require('express')
const router = express.Router()
const ObjectId = require('mongodb').ObjectID;


const shajs = require('sha.js');

const config = require('../config');
const constants = require('../lib/const');
const utils = require('../lib/utils');
const auth = require('../lib/auth');

const UserModel = require('../models/user');

class RouteConstructor {

    constructor(options){
        this.logger = options.logger;
        this.constructRouter(options.router);
    }
    
    constructRouter(router) {

        router.get('/',auth(), async (req, res) => {

            try{
                
                const connection = await UserModel.getConnection();


                const query = req.query;
                const page = query.page && query.page > 0 ? query.page : 1;

                const skip = constants.PagingRowCount * ( page - 1);
                const limit = constants.PagingRowCount;

                const list = await UserModel.findAll(
                    connection,
                    {},
                    limit,
                    skip
                );
                
                const count = await UserModel.findCount(
                    connection,
                    {}
                );

                res.send({
                    list:list.map( user => { delete user.password;delete user.token; return user}),
                    count:count,
                    pagingRowCount:constants.PagingRowCount
                }); 


            }catch(e){

                console.log(e);
                this.logger.error(e.message);
                
                return res.status(constants.HttpStatusCodeServerError)
                    .send(e.message);

            }

        });

        router.get('/:userId',auth(), async (req, res) => {

            
            try{
                
                const connection = await UserModel.getConnection();

                const user = await UserModel.findOne(
                    connection,
                    {
                        id:req.params.userId
                    }
                );

                if(!user){
                    return res.status(constants.HttpStatusCodeInvalidParam)
                                .send("Wrong user id");
    
                }

                delete user.password;

                res.send({
                    user
                });

            }catch(e){

                console.log(e);
                this.logger.error(e.message);
                
                return res.status(constants.HttpStatusCodeServerError)
                    .send(e.message);

            }


        });
     
        
        router.post('/',auth(), async (req, res) => {

            try{
                
                // check param
                const body = req.body;

                if(!body.username || body.username.length < 6)
                    return res.status(constants.HttpStatusCodeInvalidParam)
                                .send("Wrong parameter");

                if(!body.password || body.password.length < 6)
                    return res.status(constants.HttpStatusCodeInvalidParam)
                                .send("Wrong parameter");
                                
                const connection = await UserModel.getConnection();

                // check duplication
                const existingUser = await UserModel.findOne(
                    connection,
                    { username : body.username}
                );

                if(existingUser)
                    return res.status(constants.HttpStatusCodeInvalidParam)
                        .send("The username already exists");

                
                const passwordHash = shajs('sha256').update(body.password + config.cryptoSecret).digest('hex');
                
                const newId = await UserModel.insert(
                    connection,
                    {
                        username: body.username,
                        password: passwordHash
                    }
                );
                
                const user = await UserModel.findOne(
                    connection,
                    { id : newId}
                );

                delete user.password;

                res.send({
                    user:user
                }); 

            }catch(e){

                console.log(e);
                this.logger.error(e.message);
                
                return res.status(constants.HttpStatusCodeServerError)
                    .send(e.message);

            }

        });


       router.delete('/:userId',auth(), async (req, res) => {

            try{

                const connection = await UserModel.getConnection();

                // check ID valid
                const userId = req.params.userId;

                if(!userId || userId.length === 0)
                    return res.status(constants.HttpStatusCodeInvalidParam)
                                .send("Wrong parameter");

                const user = await UserModel.findOne(
                    connection,
                    {
                        id:userId
                    }
                );

                if(!user){
                    return res.status(constants.HttpStatusCodeInvalidParam)
                                .send("Wrong user id");
    
                }

                const deleteResult = await UserModel.deleteOne(
                    connection,
                    {
                        id:userId
                    }
                );

                if(!deleteResult || deleteResult !== 1){
                    return res.status(constants.HttpStatusCodeServerError)
                        .send("Failed to delete.");
                }

                res.send({
                    deleted:true
                });

            }catch(e){

                console.log(e);
                this.logger.error(e.message);
                
                return res.status(constants.HttpStatusCodeServerError)
                    .send(e.message);

            }

        });
        

        router.put('/',auth(), async (req, res) => {

            try{
                
                // check param
                const body = req.body;

                if(Object.keys(body).length == 1)
                    return res.status(constants.HttpStatusCodeInvalidParam)
                        .send("Wrong parameter");

                if(!body.id)
                    return res.status(constants.HttpStatusCodeInvalidParam)
                                .send("Wrong parameter");

                if(body.username && body.username.length < 6)
                    return res.status(constants.HttpStatusCodeInvalidParam)
                                .send("Wrong parameter");

                if(body.password && body.password.length < 6)
                    return res.status(constants.HttpStatusCodeInvalidParam)
                                .send("Wrong parameter");
                                
                const connection = await UserModel.getConnection();

                const updateParams = {};
                
                // check duplication

                if(body.username){

                    const existingUser = await UserModel.findOne(
                        connection,
                        { username : body.username}
                    );
    
                    if(existingUser && existingUser.id != body.id)
                        return res.status(constants.HttpStatusCodeInvalidParam)
                            .send("The username already exists");
    
                    updateParams.username = body.username;
                }

                if(body.password){
                    const passwordHash = shajs('sha256').update(body.password + config.cryptoSecret).digest('hex');
                    updateParams.password = passwordHash;
                }

                const updateResult = await UserModel.updateOne(
                    connection,
                    updateParams,
                    {
                        id: body.id
                    }
                );
                
                const user = await UserModel.findOne(
                    connection,
                    { id : body.id}
                );

                delete user.password;

                res.send({
                    user:user
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