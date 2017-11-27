var http = require('http');
var DBConn = require('../model/DBConnection')


function Detector(){};

Detector.init = function() {
    let that = this;
    
    new Promise(function(resolve, reject){
        let options = {
            hostname: 'localhost',
            path: '/getjobs',
        };

        let req = http.request(options, (res) => {
            // console.log(`STATUS: ${res.statusCode}`);
            // console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
            let data = '';
            res.setEncoding('utf8');
            res.on('data', (chunk) => {
                data += chunk;
                console.log(`BODY: ${chunk}`);
            });
            res.on('end', () => {
                resolve(data);    
            });
        });

        req.on('error', (e) => {
            console.log(`problem with request: ${e.message}`);
            reject(e);
        });

        req.end();
    }).then(function(data) {
        return new Promise(function(resolve, reject){
            let options = {
                method: "POST",
                host: "localhost",
                port: 80,
                path: '/feedbackdata',
                headers: {
                    "Content-Type": 'application/x-www-form-urlencoded'
                }
            };

            let req = http.request(options, (res) => {
                // console.log(`STATUS: ${res.statusCode}`);
                // console.log(`HEADERS: ${JSON.stringify(res.headers)}`); 
                let body = "";  
                res.setEncoding('utf8');
                res.on('data', (chunk) => {
                    body += chunk;
                    console.log(`BODY: ${chunk}`);
                });
                res.on('end', () => {
                    // console.log('No more data in response.');
                    resolve(body);
                });
            });

            req.on('error', (e) => {
                console.log(`problem with request: ${e.message}`);
                reject(e)
            });

            // write data to request body
            req.write(data)
            req.end();
        });
    }).then(function(res) {
        console.log(res);
        setTimeout(function(){
            that.init();
        }, 2000);
    });
}

// console.log(DBConn.getData())
module.exports = Detector;