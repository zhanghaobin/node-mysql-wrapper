"use strict";

const Pool = require("mysql/lib/Pool"),
    PoolConfig = require("mysql/lib/PoolConfig"),
    Connection = require("mysql/lib/Connection"),
    ConnectionWrapper = require("./ConnectionWrapper");

/**
 * author: bin-ZHANG
 * mail: 1534488409@qq.com
 * 
 * Wrap some methods of the "Pool" Object. (mysql.createPool(config))
 */
class ConnectionPool extends Pool {
    constructor(config) {
        super({
            config: new PoolConfig(config)
        });
    }

    _PromiseGenerator(method, args) {
        return new Promise((resolve, reject) => {
            [].push.call(args, function() {
                let error = [].shift.call(arguments);
                if (error) {
                    return reject(error);
                }
                let arg;
                for (let i in arguments) {
                    arg =  arguments[i];
                    if (arg instanceof Connection) {
                        arguments[i] = new ConnectionWrapper(arg);
                    }
                }
                if (arguments.length > 1) {
                    return resolve(arguments);
                }
                resolve(...arguments);
            });
            method.apply(this, args);
        });
    }

    getConnection() {
        return this._PromiseGenerator(super.getConnection, arguments);
    }

    acquireConnection() {
        return this._PromiseGenerator(super.acquireConnection, arguments);
    }

    end() {
        return this._PromiseGenerator(super.end, arguments);
    }

    query() {
        return this._PromiseGenerator(super.query, arguments);
    }

    releaseConnection(connection) {
        if (connection instanceof ConnectionWrapper) {
            connection = connection.getOriginConnection();
        }
        super.releaseConnection(connection);
    }
}

module.exports = ConnectionPool;
