"use strict";

/**
 * author: bin-ZHANG
 * mail: 1534488409@qq.com
 * 
 * Wrap some methods of Object "Connection" (mysql.createConnection(config))
 * and the wrapped methods will call the same methods in the origin "Connection" Object
 * what different is the wrapped methods returns a "Promise" Object
 * and then we can use async/await (or .then().catch()) instead for callback
 */
class ConnectionWrapper {
    constructor(connection) {
        if (!connection) {
            throw new Error("The parameter 'connection' must be given.");
        }
        this.context = connection;
    }

    getOriginConnection() {
        return this.context;
    }

    _PromiseGenerator(method, args) {
        return new Promise((resolve, reject) => {
            [].push.call(args, function() {
                let error = [].shift.call(arguments);
                if (error) {
                    return reject(error);
                }
                if (arguments.length > 1) {
                    return resolve(arguments);
                }
                resolve(...arguments);
            });
            method.apply(this.context, args);
        });
    }

    connect() {
        return this._PromiseGenerator(this.context.connect, arguments);
    }

    changeUser() {
        return this._PromiseGenerator(this.context.changeUser, arguments);
    }

    beginTransaction() {
        return this._PromiseGenerator(this.context.beginTransaction, arguments);
    }

    commit() {
        return this._PromiseGenerator(this.context.commit, arguments);
    }

    rollback() {
        return this._PromiseGenerator(this.context.rollback, arguments);
    }

    query() {
        return this._PromiseGenerator(this.context.query, arguments);
    }

    ping() {
        return this._PromiseGenerator(this.context.ping, arguments);
    }

    statistics() {
        return this._PromiseGenerator(this.context.statistics, arguments);
    }

    end() {
        return this._PromiseGenerator(this.context.end, arguments);
    }
}

module.exports = ConnectionWrapper;
