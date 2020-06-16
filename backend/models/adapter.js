
const DB = require('../lib/database');
const log = require('../lib/logger.js')();
const config = require('../config');
const utils = require('../lib/utils');

const logger = log.startLogger({
    filepath: config.logging.filepath,
    file: config.logging.file,
    level: config.logging.level,
    console: config.logging.console,
    maxFiles: config.logging.maxFiles,
});


class Adapter {

    static async getConnection(){
        return await DB.getConnection();
    }

    static async find(connection,collection,params,limit,offset,sort) {

        let query = `SELECT * from \`${collection}\``;

        if(params){
            query += " where 1=1" + Object.keys(params).reduce( (condition,key) => {

                const value = params[key];

                if(Array.isArray(value)){

                    const newValue = [...value];

                    if(newValue.length == 0) newValue.push(-99); // prevent sql error
                    
                    condition += ` and \`${key}\` in (`;

                    newValue.forEach( (inKey,index) => {
                        condition += '?';
                        if(index < newValue.length - 1)
                            condition += ","
                    });

                    condition += ')';

                    return condition 

                } else if (/JSON/.test(value)){

                    condition += ` and ${value}`;
                    return condition;


                } else if (value && value.key && value.value){

                    condition += ` and ${value.key}`;
                    return condition;

                }  else
                    return condition += ` and \`${key}\` = ?`;

            },"");
        }

        const values = Object.keys(params).reduce( (values,key) => {

                const value = params[key];

                if(Array.isArray(value)){

                    const newValue = [...value];
                    if(newValue.length == 0) newValue.push(-99); // prevent sql error

                    newValue.forEach( (inKey,index) => {
                        values.push(inKey);
                    });

                } else if (/JSON/.test(value)){


                } else if (value && value.key && value.value){

                    values.push(value.value);

                 } else

                    values.push(params[key]);

                return values;
                
        },[]);

        if(sort && sort.sort && sort.order){
            const order = /asc/.test(sort.order) ? 'asc' : 'desc';
            query += ` order by \`${sort.sort}\` ${order} `;
        }

        if(limit)
            query += ` limit ${limit} `;
           
        if(offset)
            query += ` offset ${offset} `;

        logger.info("Query exec -->");
        logger.info(query);
        logger.info(values);
        logger.info("<--");

        const [rows,fields] = await connection.execute(query,values);

        return rows;

    }

    static async findOne(connection,collection,params) {

        const result = await Adapter.find(connection,collection,params);
        if(!result) return null;
        return result[0];

    }

    static async findCount(connection,collection,params) {

        let query = `SELECT count(*) as count from \`${collection}\``;

        if(params){
            query += " where 1=1" + Object.keys(params).reduce( (condition,key) => {

                const value = params[key];

                if(Array.isArray(value)){

                    const newValue = [...value];

                    if(newValue.length == 0) newValue.push(-99); // prevent sql error
                    
                    condition += ` and \`${key}\` in (`;

                    newValue.forEach( (inKey,index) => {
                        condition += '?';
                        if(index < newValue.length - 1)
                            condition += ","
                    });

                    condition += ')';

                    return condition 

                }  else if (value && value.key && value.value){

                    condition += ` and ${value.key}`;
                    return condition;

                }  else
                        return condition += ` and \`${key}\` = ?`;

                },"");
        }

        const values = Object.keys(params).reduce( (values,key) => {

            const value = params[key];

            if(Array.isArray(value)){

                const newValue = [...value];
                if(newValue.length == 0) newValue.push(-99); // prevent sql error

                newValue.forEach( (inKey,index) => {
                    values.push(inKey);
                });

            } else if (value && value.key && value.value){

                values.push(value.value);

             } else
             
                values.push(params[key]);

            return values;

        },[]);

        logger.info("Query exec -->");
        logger.info(query);
        logger.info(values);
        logger.info("<--");

        const [rows,fields] = await connection.execute(query,values);

        return rows[0].count;

    }

    static async update(
        connection,
        collection,
        paramsUpdate,
        paramsFind) {

            let query = `UPDATE \`${collection}\``;

            if(paramsUpdate){
                query += " set " + Object.keys(paramsUpdate).reduce( (condition,key) => {
                    return condition += ` \`${key}\` = ?,`;
                },"");

                // remove last ","
                query = query.substr(0,query.length - 1);
            }
    
            if(paramsFind){
                query += " where 1=1 " + Object.keys(paramsFind).reduce( (condition,key) => {
                    return condition += ` and \`${key}\` = ?`;
                },"");

            }

            const allValues = {...paramsUpdate,...paramsFind};

            const values = Object.keys(allValues).reduce( (values,key) => {

                if(allValues[key] === "") allValues[key]  = null;
                values.push(allValues[key]);
                return values;

            },[]);
    
            logger.info("Query exec -->");
            logger.info(query);
            logger.info(values);
            logger.info("<--");

            const [result] = await connection.execute(query,values);
    
            return result;

    }


    static async updateOne(
        connection,
        collection,
        paramsUpdate,
        paramsFind) {

            logger.info('paramsUpdate');
            logger.info(utils.dump(paramsUpdate));

            let query = `UPDATE \`${collection}\``;

            if(paramsUpdate){
                query += " set " + Object.keys(paramsUpdate).reduce( (condition,key) => {
                    return condition += ` \`${key}\` = ?,`;
                },"");

                // remove last ","
                query = query.substr(0,query.length - 1);
            }
    
            if(paramsFind){
                query += " where 1=1 " + Object.keys(paramsFind).reduce( (condition,key) => {
                    return condition += ` and \`${key}\` = ?`;
                },"");

            }

            query += " limit 1";
            
            const allValues = {...paramsUpdate,...paramsFind};

            const values = Object.keys(allValues).reduce( (values,key) => {
                    if(allValues[key] === "") allValues[key]  = null;
                    values.push(allValues[key]);
                    return values;
            },[]);
    
            logger.info("Query exec -->");
            logger.info(query);
            logger.info(JSON.stringify(values));
            logger.info("<--");
            
            const [result] = await connection.execute(query,values);
    
            return result;

    }

    static async insert(
        connection,
        collection,
        params) {

            let query = `insert \`${collection}\``;

            if(params){
                query += "  (  " + Object.keys(params).reduce( (columns,key) => {
                    return columns += ` \`${key}\`,`;
                },"");

                // remove last ","
                query = query.substr(0,query.length - 1) + ")";
            }
    
            if(params){

                query += " values ( " + Object.keys(params).reduce( (values,key) => {
                    return values += ` ?,`;
                },"");

                // remove last ","
                query = query.substr(0,query.length - 1) + ")";
            }
            
            const values = Object.keys(params).reduce( (values,key) => {
                    if(params[key] === "") params[key]  = null;
                    values.push(params[key]);
                    return values;
            },[]);
    
            logger.info("Query exec -->");
            logger.info(query);
            logger.info(values);
            logger.info("<--");
            
            const [result] = await connection.execute(query,values);
    
            return result.insertId;

    }

    static async delete(connection,collection,params,limit) {

        let query = `DELETE from \`${collection}\``;

        if(params){
            query += " where 1=1" + Object.keys(params).reduce( (condition,key) => {
                return condition += ` and \`${key}\` = ?`;
            },"");
        }

        const values = Object.keys(params).reduce( (values,key) => {
                values.push(params[key]);
                return values;
        },[]);

        if(limit)
            query += ` limit ${limit} `;
           
        logger.info("Query exec -->");
        logger.info(query);
        logger.info(values);
        logger.info("<--");

        const [result] = await connection.execute(query,values);

        return result.affectedRows;

    }

    static async deleteOne(connection,collection,params) {

        const result = await Adapter.delete(connection,collection,params,1);
        if(!result) return null;
        return result;

    }

    constructor(){

    }
    
}

module.exports = Adapter;