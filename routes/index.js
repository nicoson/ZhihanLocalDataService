var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/astockdata', function(req, res, next) {
    res.send({data: [1,2,3]});
});

module.exports = router;
