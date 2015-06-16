
var mongoose = require('mongoose');
var crypto = require('crypto');

var schema = new mongoose.Schema({
	code: String,
	created: { type: Date, default: Date.now },
	expires: Date,
	validFor: {
		categories: [String],
		products: [Number]
	}
})

schema.pre('save', function (next) {

    if (this.isNew) {
    	this.code = generateCode();
    }

    next();

});

var generateCode = function () {
    return crypto.randomBytes(8).toString('base64');
};

mongoose.model('Promocode', schema);
