var express = require('express');
var router = express.Router();

/* GET galery listing. */
router.get('/galery', function(req, res, next) {
    res.send('galery', { title: 'Galery ' });
});

module.exports = router;