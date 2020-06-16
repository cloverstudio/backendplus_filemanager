const constants = require("./const");
const UserModel = require('../models/user');

checkToken = () => {

    return (request, response, next) => {
        
        (async() => {

            const connection = await UserModel.getConnection();

            const token = request.headers['token'];

            if(!token || token.length === 0){

                return response.status(constants.HttpStatusCodeUnAuthorise)
                    .send("Invalid token");

            }

            const user = await UserModel.findOne(
                connection,
                {
                    token:token
                }
            );

            if(!user){

                return response.status(constants.HttpStatusCodeUnAuthorise)
                    .send("Invalid token");

            }
            
            request.user = user;

            next();
            
        })();

    }


}

module.exports = checkToken;