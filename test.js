var http = require('http');
var mysql = require('mysql');

(function init() {
    // let that = this;
    let options = {
        hostname: 'localhost',
        path: '/getjobs',
    };

    let req = http.request(options, (res) => {
        // console.log(`STATUS: ${res.statusCode}`);
        // console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
            console.log(`BODY: ${chunk}`);
        });
        res.on('end', () => {
            // console.log('No more data in response.');
            setTimeout(function(){console.log('========>    next round  ...'); init();}, 2000);
        });
    });

    req.on('error', (e) => {
        console.log(`problem with request: ${e.message}`);
    });

    // write data to request body
    req.end();
})()