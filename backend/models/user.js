
const utils = require('../lib/utils');
const conf = require('../config');

const Adapter = require('./adapter');

// model
class User extends Adapter{
    
    constructor(param){

        super();

        this.id = param.id;
        this.username = param.username;
        this.password = param.password;
        this.token = param.token;
        this.modified_at = param.modified_at;
        this.created_at = param.created_at;

    }

    static async findAll(connection,params,limit,offset){

        const result = await Adapter.find(
            connection,
            conf.tablePrefix + 'users',
            params,
            limit,
            offset
        );

        if(!result) return null;

        return result.map( row => new User(row));

    }

    static async findOne(connection,params){

        const result = await Adapter.findOne(
            connection,
            conf.tablePrefix + 'users',
            params
        );

        if(!result) return null;

        return new User(result);

    }

    static async findCount(connection,params){

        const result = await Adapter.findCount(
            connection,
            conf.tablePrefix + 'users',
            params
        );

        if(!result) return null;

        return result;

    }

    static async insert(connection,params){

        const newId = await Adapter.insert(
            connection,
            conf.tablePrefix + 'users',
            params
        );

        if(!newId) return null;

        return newId;

    }

    static async deleteOne(connection,params){

        const result = await Adapter.deleteOne(
            connection,
            conf.tablePrefix + 'users',
            params
        );

        if(!result) return null;

        return result;

    }

    static async updateOne(connection,params,conditions){

        const result = await Adapter.updateOne(
            connection,
            conf.tablePrefix + 'users',
            params,
            conditions
        );

        if(!result) return null;

        return result;

    }

    static async login(connection,username,hash) {

        const user = await Adapter.findOne(
            connection,
            conf.tablePrefix + 'users',{
                username:username,
                password:hash
            }
        );
        
        if(!user)
            return null;

        const newToken = utils.getRandomString();

        await Adapter.updateOne(
            connection,
            conf.tablePrefix + 'users',
            {token:newToken},
            {id:user.id}
        );
        
        return new User({
            ...user,
            token:newToken
        });

    }

}

module.exports = User;