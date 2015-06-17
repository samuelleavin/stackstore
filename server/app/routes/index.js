'use strict';
var router = require('express').Router();
module.exports = router;

var ensureAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).redirect('/');
    }
};

router.use('/search', require('./search'));
router.use('/products', require('./products'));
router.use('/cart', require('./cart'));
router.use('/userCreation', require('./userCreation'));
router.use('/checkout', require('./checkout'));
router.use('/promo', require('./promo'));

router.use('/account', ensureAuthenticated, require('./account'));
router.use('/admin', ensureAuthenticated, require('./admin'));

// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});