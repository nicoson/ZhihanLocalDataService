var http = require('http');
var DBConn = require('../model/DBConnection');
const querystring = require("querystring");
const publicServer = 'zhihanpublicservice.azurewebsites.net';
// const publicServer = 'localhost';

function Detector(){};

Detector.init = function() {
    let that = this;
    
    new Promise(function(resolve, reject){
        let options = {
            hostname: publicServer,
            path: '/getjobs',
        };

        let req = http.get(options, (res) => {
            // console.log(`STATUS: ${res.statusCode}`);
            // console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
            let data = '';
            res.setEncoding('utf8');
            res.on('data', (chunk) => {
                data += chunk;
                console.log(`GET BODY: ${chunk}`);
            });
            res.on('end', () => {
                resolve(JSON.parse(data));    
            });
        });

        req.on('error', (e) => {
            console.log(`problem with request: ${e.message}`);
            reject(e);
        });

        req.end();
    }).then(function(data) {
        let jobname = Object.keys(data).filter(e => (e.length == 13));
        for(let i in data)console.log(data[i]);
        if(jobname.length == 0) {
            console.log('========>  no jobs')
        }else{
            console.log("========>  current jobs");
            console.log(data);

            let jobList = [];
            let p = '';
            for(let i in jobname) {
                if(data[jobname[i]].start == undefined){
                    p = DBConn.getNameList(data[jobname[i]].db, data[jobname[i]].table);
                }else{
                    p = DBConn.getData(data[jobname[i]].db, data[jobname[i]].table, data[jobname[i]].start, data[jobname[i]].end);
                }
                jobList.push(p);
            }

            console.log('==========>    start to handle jobs');
            Promise.all(jobList).then(function(result){
                let sqlData = {}
                for(let i in jobname) {
                    sqlData[jobname[i]] = result[i];
                }
                return new Promise(function(resolve, reject){
                    resolve(sqlData)
                });
            }).then(function(data) {
                console.log('==========>    start to post jobs results');
                console.log(data);
                return new Promise(function(resolve, reject){
                    let options = {
                        method: "POST",
                        host: publicServer,
                        // port: 80,
                        path: '/feedbackdata',
                        headers: {
                            "Content-Type": 'application/json'
                        }
                    };

                    let req = http.request(options, (res) => {
                        // console.log(`STATUS: ${res.statusCode}`);
                        // console.log(`HEADERS: ${JSON.stringify(res.headers)}`); 
                        let body = "";  
                        res.setEncoding('utf8');
                        res.on('data', (chunk) => {
                            body += chunk;
                            console.log(`POST BODY: ${chunk}`);
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
                    req.write(JSON.stringify({sqlData: data}));
                    req.end();
                });
            }).then(function(res){
                console.log("==========>    data posted");
            });
        }

        return new Promise(function(resolve, reject){
            resolve("next round")
        });
    }).then(function(res) {
        console.log(res);
        setTimeout(function(){
            that.init();
        }, 3000);
    }).catch(function(res) {
        console.log(res);
        setTimeout(function(){
            that.init();
        }, 3000);
    });
}

// console.log(DBConn.getData())
module.exports = Detector;