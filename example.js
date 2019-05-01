"use strict";

const ConnectionPool = require("./ConnectionPool"),
        config = {
            host: "localhost",
            port: 3306,
            user: "root",
            password: "password",
            database: "test",
            connectionLimit: 8
        };

let pool = new ConnectionPool(config);

//usages

(async () => {
    let conn;
    try {
        // single return-value
        conn = await pool.getConnection(); // get connection
        
        // multiple return-value
        let [results, fields] = await conn.query("INSERT INTO test(test) VALUES('all is ok!');"); // execute SQL
        console.log("insert result: %o", {
            results, fields
        });
        [results, fields] = await conn.query("SELECT * FROM test;");
        console.log("\nquery result: %o", {
            results,
            fields
        });
    } catch(e) {
        console.log(e);
    } finally {
        if (conn) {
            pool.releaseConnection(conn); // close connection
        }
    }
})();

// or 

// pool.getConnection()
//         .then((conn) => {
//             conn.query("INSERT INTO test(test) VALUES('all is ok!');")
//                 .then((results) => {
//                     console.log("insert result: %o", {
//                         results: results[0],
//                         fields: results[1]
//                     });
//                     conn.query("SELECT * FROM test;")
//                         .then((results) => {
//                             console.log("\nquery result: %o", {
//                                 results: results[0],
//                                 fields: results[1]
//                             });
//                             pool.releaseConnection(conn);
//                         })
//                         .catch((e) => {
//                             console.log(e);
//                             pool.releaseConnection(conn);
//                         });
//                 })
//                 .catch((e) => {
//                     console.log(e);
//                     pool.releaseConnection(conn);
//                 });
//         })
//         .catch((e) => {
//             console.log(e);
//         });