'use strict';
var router = require('express').Router();
module.exports = router;

router.use('/search', require('./search'));
router.use('/products', require('./products'));
router.use('/tutorial', require('./tutorial'));
router.use('/account', require('./account'));
router.use('/cart', require('./cart'));
router.use('/userCreation', require('./userCreation'));

// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});