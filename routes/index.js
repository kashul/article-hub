var express = require('express');
var router = express.Router();
const express = require('express');
const router = express.Router();

module.exports = router;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
