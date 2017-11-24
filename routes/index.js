var express = require('express');
var router = express.Router();
var DBConn = require('../model/DBConnection')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/astocknamelist', function(req, res, next) {
    DBConn.getNameList(res, 'astock', 'updatelog');
});

router.post('/astockdata', function(req, res, next) {
    DBConn.getData(res, 'astock', req.body.table, req.body.start, req.body.end);
});

router.get('/futurenamelist', function(req, res, next) {
    DBConn.getNameList(res, 'future', 'updatelog');
});

router.post('/futuredata', function(req, res, next) {
    DBConn.getData(res, 'future', req.body.table, req.body.start, req.body.end);
});

module.exports = router;
