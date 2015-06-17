var router = require('express').Router();
var mongoose = require('mongoose');

module.exports = router;

var ensureAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).redirect('/');
    }
};

router.get('/', function (req, res, next) {

	mongoose.model('Promocode')
	.find({})
	.exec()
	.then(function (allCodes) {
		res.send(allCodes);
	}, next);

})

router.get('/:code', function (req, res, next) {

	var possibleCode = {promoCodeName: req.params.code};

	mongoose.model('Promocode')
	.findOne(possibleCode)
	.exec()
	.then(function (aPromo) {

		res.send(aPromo);

	}, next);
})

router.post('/', function (req, res, next) {
	var promoToAdd = req.body;

	mongoose.model('Promocode').create(promoToAdd, function (err, createdPromo) {
		if (err) {

			res.send(new Error('Error creating your promo.'))
		} else {
			
			res.send(createdPromo)
		}
	})

})

router.post('/', function (req, res, next) {
	// body...
})

router.delete('/', function (req, res, next) {
	// body...
})