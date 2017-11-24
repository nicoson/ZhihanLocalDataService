//connection to database
var mysql = require('mysql');

function DBConn(){};

DBConn.getData = function(res, db, table, start, end) {
    //  config database
    let connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: db
    });

    connection.connect();
    let sql = 'SELECT * from `' + table + '` where lastradeday_s>="' + start + '" and lastradeday_s<="' + end + '"';
    console.log(sql);
    //  execute query
    connection.query(sql, function(err, rows, fields) {
        if (err) throw err;
        // console.log('The result is: ', rows);
        res.send(rows);
    });
    //  close connection
    connection.end();
}

DBConn.getNameList = function(res, db, table) {
    //  config database
    let connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: db
    });

    connection.connect();
    let sql = 'SELECT stock_code from ' + table;
    console.log(sql);
    //  execute query
    connection.query(sql, function(err, rows, fields) {
        if (err) throw err;
        // console.log('The result is: ', rows);
        res.send(rows);
    });
    //  close connection
    connection.end();
}

// console.log(DBConn.getData())
module.exports = DBConn;