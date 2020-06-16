const _default = require('./default');

let config = _default;

if ( process.env.NODE_ENV ) {
    config = require('./' + process.env.NODE_ENV);    
} 

module.exports = config;