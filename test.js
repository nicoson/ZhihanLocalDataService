var http = require('http');
const publicServer = 'zhihanpublicservice.azurewebsites.net';
new Promise(function(resolve, reject){
    let options = {
        method: 'GET',
        host: publicServer,
        path: '/getjobs'
    };

    let req = http.get(options, (res) => {
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
}).then(e=>console.log(e));