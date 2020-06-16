var express = require('express')
var router = express.Router()

class RouteConstructor {

    constructor(options){
        this.logger = options.logger;
        this.constructRouter(options.router);
    }
    
    constructRouter(router) {

        router.get('/', async (req, res) => {
            res.send({test:"test"});
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