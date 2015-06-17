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

		if (!aPromo) {
			next({message: 'Promo does not exist.'})
		} else {
			res.send(aPromo);
		}

	}, next);
})

router.post('/', function (req, res, next) {
	var promoToAdd = req.body;

	mongoose.model('Promocode')
	.create(promoToAdd, function (err, createdPromo) {
		
		if (err) {

			next(err);

		} else {
			
			res.send(createdPromo);
		}
	})
})

router.put('/', function (req, res, next) {

	var promoToUpdate = req.body;

	mongoose.model('Promocode')
	.findOneAndUpdate({promoCodeName: promoToUpdate.promoCodeName}, promoToUpdate)
	.exec()
	.then(function (maybeUpdatedPromo) {

		res.send(maybeUpdatedPromo);

	}, next)

})

router.delete('/:code', function (req, res, next) {

	var promoToDelete = req.params.code;
	
	mongoose.model('Promocode')
	.findOneAndRemove({promoCodeName: promoToDelete})
	.exec()
	.then(function (something) {
		res.send(something)
	}, next)
})