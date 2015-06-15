'use strict';
var router = require('express').Router();
module.exports = router;

router.use('/search', require('./search'));
router.use('/products', require('./products'));
router.use('/account', require('./account'));
router.use('/cart', require('./cart'));
router.use('/userCreation', require('./userCreation'));
router.use('/checkout', require('./checkout'));
router.use('/admin', require('./admin'));

// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});