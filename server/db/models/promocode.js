
var mongoose = require('mongoose');
var crypto = require('crypto');

var schema = new mongoose.Schema({
	code: String,
	created: { type: Date, default: Date.now },
	expires: Date,
	validFor: {
		categories: [String],
		products: [Number]
	},
	discount: Number,
	promoCodeName: String
});

schema.pre('save', function (next) {

    if (this.isNew) {
    	this.code = generateCode();
    }
    next();
});

var generateCode = function () {
    return crypto.randomBytes(3).toString('hex').toUpperCase();
};

mongoose.model('Promocode', schema);
