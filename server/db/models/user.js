'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name: { first: String, last: String },
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
    shipping_address: { 
        street_address: String, //1234 Wall St.
        apt_number: String,
        city: String,
        state: String,
        zipcode: Number,
        required: true
    },

    billing_address: {
        street_address: String, //1234 Wall St.
        apt_number: Number,
        city: String,
        state: String,
        zipcode: Number,
        required: true
    },

    payment_info: {
        card_type: String,
        number: Number,
        required: true
    },

    reviews: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Review'} ],
    account_status: Boolean,
    admin: Boolean
});

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
    return encryptPassword(candidatePassword, this.salt) === this.password;
});

mongoose.model('User', schema);