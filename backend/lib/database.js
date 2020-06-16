const MySQL = require('mysql2/promise');


class DB {

    constructor(){
        this.pool = null;
    }

    init(connectionConfig){
        this.connectionConfig = connectionConfig;
    }

    async getConnection(){

        if(!this.pool){
            this.pool = await MySQL.createPool(this.connectionConfig);
        }
        
        return this.pool;

    }

}

// singleton
module.exports = new DB();