/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

Refer to the q documentation for why and how q.invoke is used.

*/

var mongoose = require('mongoose');
var connectToDb = require('./server/db');
var User = mongoose.model('User');
var Product = mongoose.model('Product');
var q = require('q');
var chalk = require('chalk');

var getCurrentUserData = function () {
    return q.ninvoke(User, 'find', {});
};

var seedUsers = function () {

    var users = [
        {
            name: { first: "Test", last: "Me"},
            email: 'testing@fsa.com',
            password: 'password',
            shipping_address: {
                street_address: "1234 Wall Street",
                apt_number: "9F",
                city: "New York",
                state: "NY",
                zipcode: 12345
            },

            billing_address: {
                street_address: "1234 Wall Street",
                apt_number: "9F",
                city: "New York",
                state: "NY",
                zipcode: 12345
            },

            payment_info: {
                card_type: "Visa",
                number: 1234567890123456
            },

            account_status: true,
            admin: true

        },

        {
            email: 'obama@gmail.com',
            password: 'potus'
        }
    ];

    return q.invoke(User, 'create', users);

};

var seedUsers = function () {

    var products = [
        {
            sku: 123,
            name: "Striped Midi Dress",
            photos: [ { type: String } ],
            description: "A really cool dress. BUY IT!",
            category: "Dresses", //types of top or bottoms (pants, shorts, skirts)
            type: "Tops", //top or bottom
            price: 80,
            color: ["White", "Beige"],
            gender: "Women",
            brand: "Forever 21",
            size: "Small",
            onSale: false,
            inStock: true
        },

        {
            sku: 456,
            name: "Flat-Front Chinos",
            photos: [ { type: String } ],
            description: "This makes you look amazing. BUY IT!",
            category: "Pants", //types of top or bottoms (pants, shorts, skirts)
            type: "Bottoms", //top or bottom
            price: 15,
            color: ["Black", "Beige"],
            gender: "Women",
            brand: "Forever 21",
            size: "Small",
            onSale: false,
            inStock: true
        },

    ];

    return q.invoke(Product, 'create', products);

};

connectToDb.then(function () {
    getCurrentUserData().then(function (users) {
        if (users.length === 0) {
            return seedUsers();
        } else {
            console.log(chalk.magenta('Seems to already be user data, exiting!'));
            process.kill(0);
        }
    }).then(function () {
        console.log(chalk.green('Seed successful!'));
        process.kill(0);
    }).catch(function (err) {
        console.error(err);
        process.kill(1);
    });
});