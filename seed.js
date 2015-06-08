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
var Review = mongoose.model('Review');
var Order = mongoose.model('Order');
var q = require('q');
var chalk = require('chalk');

var getCurrentUserData = function () {
    return q.ninvoke(User, 'find', {});
};

var getCurrentProductData = function () {
    return q.ninvoke(Product, 'find', {});
};

var getCurrentReviewData = function () {
    return q.ninvoke(Review, 'find', {});
};

var getCurrentOrderData = function () {
    return q.ninvoke(Order, 'find', {});
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

var seedProducts = function () {

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
            photos: [ {x: "hi" } ],
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
        }

    ];

    return q.invoke(Product, 'create', products);

};

var seedReviews = function () {

    var reviews = [
        {
            author: "Obama",
            product_sku: 123,
            star_rating: 5,
            content: "I look sooooooo good in this! I love it!"
        },

        {
            author: "Tester",
            product_sku: 124,
            star_rating: 1,
            content: "I look sooooooo bad in this! Don't buy it!"
        }

    ];

    return q.invoke(Review, 'create', reviews);

};

var seedOrders = function () {

    var orders = [
        {
            order_number: 1,
            total_price: 55,
            shipping_address: {
                street_address: '5678 Wall St',
                apt_number: '3A',
                city: 'New York',
                state: 'NY',
                country: 'USA',
                zipcode: 11267,
                phone: 1234567890
            }
        },

        {
            order_number: 2,
            total_price: 40,
            shipping_address: {
                street_address: '135 Pine St',
                apt_number: '1B',
                city: 'New York',
                state: 'NY',
                country: 'USA',
                zipcode: 11345,
                phone: 0987654321
            }
        }
    ];

    return q.invoke(Order, 'create', orders);

};

connectToDb.then(function () {
            getCurrentUserData().then(function (users) {
                if (users.length === 0) {
                    return seedUsers();
                } else {
                    console.log(chalk.magenta('Seems to already be user data, exiting!'));
                    // process.kill(0);
                    return;
                }

            }).then(function(){
                getCurrentProductData().then(function(products) {
                    if (products.length === 0) {
                        return seedProducts();
                    } else {
                        console.log(chalk.magenta('Seems to already be product data, exiting!'));
                        return;
                    }

                }).then(function(){
                getCurrentReviewData().then(function(reviews) {
                    if (reviews.length === 0) {
                        return seedReviews();
                    } else {
                        console.log(chalk.magenta('Seems to already be review data, exiting!'));
                        return;
                    }

                }).then(function(){
                getCurrentOrderData().then(function(orders) {
                    if (orders.length === 0) {
                        return seedOrders();
                    } else {
                        console.log(chalk.magenta('Seems to already be order data, exiting!'));
                        process.kill(0);
                    }

                }).then(function (){
                    console.log(chalk.green('Seed successful!'));
                    process.kill(0);
                }).catch(function (err) {
                    console.error(err);
                    process.kill(1);
                });
            });
        });
    });
});