//connection to database
const mysql = require('mysql');
const HOST = '127.0.0.1';
const USER = 'root';
const PASSWORD = 'root';

function DBConn(){};

DBConn.getData = function(db, table, start, end) {
    //  config database
    let connection = mysql.createConnection({
        host: HOST,
        user: USER,
        password: PASSWORD,
        database: db
    });

    let p = new Promise(function(resolve, reject){
        connection.connect();
        let sql = 'SELECT * from `' + table + '` where last_trade_day>="' + start + '" and last_trade_day<="' + end + '"';
        console.log(sql);
        //  execute query
        connection.query(sql, function(err, rows, fields) {
            if (err) {
                reject(err);
            }
            // console.log(handleRows(rows));
            resolve(handleRows(rows));
        });
        //  close connection
        connection.end();
    });

    return p;
}

// DBConn.getIndexData = function(db, table, start, end) {
//     //  config database
//     let connection = mysql.createConnection({
//         host: HOST,
//         user: USER,
//         password: PASSWORD,
//         database: db
//     });

//     let p = new Promise(function(resolve, reject){
//         connection.connect();
//         let sql = 'SELECT * from `' + table + '` where last_trade_day>="' + start + '" and last_trade_day<="' + end + '"';
//         console.log(sql);
//         //  execute query
//         connection.query(sql, function(err, rows, fields) {
//             if (err) {
//                 reject(err);
//             }
//             // console.log(handleRows(rows));
//             resolve(handleRows(rows));
//         });
//         //  close connection
//         connection.end();
//     });

//     return p;
// }

DBConn.getNameList = function(db, table) {
    //  config database
    let connection = mysql.createConnection({
        host: HOST,
        user: USER,
        password: PASSWORD,
        database: db
    });

    let p = new Promise(function(resolve, reject){
        connection.connect();
        let sql = '';
        if(table) {
            sql = 'SELECT stock_code from ' + table;
            console.log(sql);
        } else {
            sql = 'show tables;';
        }
        //  execute query
        connection.query(sql, function(err, rows, fields) {
            if (err) {
                reject(err);
            }
            // console.log('The result is: ', rows);
            resolve(rows);
        });
        //  close connection
        connection.end();
    });

    return p;
}

function handleRows(data) {
    let res = {}
    if(data != undefined && data != null && data.length > 0) {
        let keyword = Object.keys(data[0]);
        for(let i=0; i<keyword.length; i++) {
            res[keyword[i]] = [];
            // console.log(keyword[i])

            for(let j=0; j<data.length; j++) {
                res[keyword[i]].push(data[j][keyword[i]])
            }
        }
        console.log("==========>    ", res.ID.length, " data derived");
    } else {
        res = {data: null};
        console.log("==========>    no related data");
    }
    return res;
}

// console.log(DBConn.getData())
module.exports = DBConn;