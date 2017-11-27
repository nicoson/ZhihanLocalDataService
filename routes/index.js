var express = require('express');
var router = express.Router();
var DBConn = require('../model/DBConnection')

/* local api - for test */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/astocknamelist', function(req, res, next) {
    let p = DBConn.getNameList('astock', 'updatelog');
    p.then(e => res.send(e));
});

router.post('/astockdata', function(req, res, next) {
    let p = DBConn.getData('astock', req.body.table, req.body.start, req.body.end);
    p.then(e => res.send(e));
});

router.get('/futurenamelist', function(req, res, next) {
    let p = DBConn.getNameList('future', 'updatelog');
    p.then(e => res.send(e));
});

router.post('/futuredata', function(req, res, next) {
    let p = DBConn.getData('future', req.body.table, req.body.start, req.body.end);
    p.then(e => res.send(e));
});


// middle ware api
module.exports = router;
