'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');
var Q = require('q');

var schema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: {
        type: String,
        required: true
    },
    password: {
        type: String
    },
    salt: {
        type: String
    },
    twitter: {
        id: String,
        username: String,
        token: String,
        tokenSecret: String
    },
    facebook: {
        id: String
    },
    google: {
        id: String
    },

    favorites: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Product'} ],
    
    shopping_cart: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Product'} ],
    
    order_history: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Order'} ],
    
    //

    shipping_address: {
        street_address: String,
        apt_number: String,
        city: String,
        state: String,
        zipcode: Number
    },

    billing_address: {
        street_address: String,
        apt_number: String,
        city: String,
        state: String,
        zipcode: Number
    },

    payment_info: {
        name_on_card: String,
        card_type: String,
        number: Number,
        expiration_month: Number,
        expiration_year: Number
    },

    admin: Boolean
});

//Add ability to check if user exists
var checkUserExists = function (emailToCheck) {

    return this.findOne(emailToCheck).exec();
}

schema.statics.checkUserExists = checkUserExists;

//Add capabilities for adding to cart directly onto the user model.
var addToCartBySku = function (userId, skuToAdd, callback) {

    var userPromise = this.findById(userId).populate('shopping_cart').exec();
    var itemPromise = 
        this.model('Product').findOne({sku: skuToAdd}).populate('inventory').exec();

    return Q.all([userPromise, itemPromise]).then(function (results) {

        var user = results[0], item = results[1];

        user.shopping_cart.push(_.create(_.omit(item, ['_id', '_v'])));

        user.save(callback);

        return user.shopping_cart;

    }, callback)

}

schema.statics.addToCartBySku = addToCartBySku;

// generateSalt, encryptPassword and the pre 'save' and 'correctPassword' operations
// are all used for local authentication security.
var generateSalt = function () {
    return crypto.randomBytes(16).toString('base64');
};

var encryptPassword = function (plainText, salt) {
    var hash = crypto.createHash('sha1');
    hash.update(plainText);
    hash.update(salt);
    return hash.digest('hex');
};

schema.pre('save', function (next) {

    if (this.isModified('password')) {
        this.salt = this.constructor.generateSalt();
        this.password = this.constructor.encryptPassword(this.password, this.salt);
    }

    next();

});

schema.statics.generateSalt = generateSalt;
schema.statics.encryptPassword = encryptPassword;

schema.method('correctPassword', function (candidatePassword) {
    if (!this.salt) return false;
    return encryptPassword(candidatePassword, this.salt) === this.password;
});

mongoose.model('User', schema);