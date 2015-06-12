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


//6/8/15  (monday) so.... for tuesday we need a 
// seperate address schema and ask the fellows
// about unauthorized users and sessions

var mongoose = require('mongoose');
var connectToDb = require('./server/db');
var User = mongoose.model('User');
var Product = mongoose.model('Product');
var Review = mongoose.model('Review');
var Order = mongoose.model('Order');
var Inventory = mongoose.model('Inventory')
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

var getCurrentInventoryData = function () {
    return q.ninvoke(Inventory, 'find', {});
};

var seedUsers = function () {

    var users = [
        {
            first_name: "John",
            
            last_name: "Doe",
            
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
                zipcode: 12343
            },

            payment_info: {
                card_type: "Visa",
                number: 1234567890123456,
                expiration_month: 10,
                expiration_year: 2016
            },

            admin: true
        },

        {
            email: 'obama@gmail.com',
            password: 'potus'
        }
    ];

    return q.invoke(User, 'create', users);

};

var seedInventory = function () {
    var inventory = [
    {
        product_sku: 123,
        small : [{ color : "black", quantity: 5},
                 { color : "yellow", quantity: 5}],
        medium : [{ color : "black", quantity: 5}],
        large : [{ color : "black", quantity: 5}],
        xlarge : [{ color : "black", quantity: 5}]
    },

    {
        product_sku: 456,
        small : [{ color : "black", quantity: 5},
                 { color : "yellow", quantity: 5}],
        medium : [{ color : "black", quantity: 5}],
        large : [{ color : "black", quantity: 5}],
        xlarge : [{ color : "black", quantity: 5}]
    }]
    return q.invoke(Inventory, 'create', inventory);
};  

var seedProducts = function () {

    var products = [
        {
            sku: 123,
            name: "Striped Midi Dress",
            photos: ["/images/midi-dress.jpg"],
            description: "A really cool dress. BUY IT!",
            category: "Tops",
            type: "Dresses",
            price: 80,
            gender: "Women",
            brand: "Forever 21",
            onSale: false,
            inStock: true
        },

        {
            sku: 456,
            name: "Flat-Front Chinos",
            photos: ["/images/chino1.jpg"],
            description: "This makes you look amazing. BUY IT!",
            category: "Bottoms",
            type: "Pants",
            price: 15,
            color: ["Beige"],
            gender: "Women",
            brand: "Forever 21",
            size: "Small",
            onSale: false,
            inStock: true
        },

         {
            sku: 789,
            name: "Ombre Tee",
            photos: ["/images/midi-dress.jpg"],
            description: "A really cool shirt. BUY IT!",
            category: "Tops", 
            type: "Short-Sleeve",
            price: 80,
            color: ["White", "Black"],
            gender: "Women",
            brand: "Forever 21",
            size: "Small",
            onSale: false,
            inStock: true
        },

         {
            sku: 101112,
            name: "Blue-Jean Shorts",
            photos: ["/images/midi-dress.jpg"],
            description: "You'll like these shorts. BUY IT!",
            category: "Bottoms",
            type: "Shorts",
            price: 80,
            color: ["White", "Black"],
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
            star_rating: 5,
            content: "I look sooooooo good in this! I love it!"
        },

        {
            author: "Cat",
            product_sku: 123,
            star_rating: 5,
            content: "I look sooooooo good in this! I love it!"
        },

        {
            author: "Kara",
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
                        return;
                    }

                }).then(function() {
                    getCurrentInventoryData().then(function(inventory) {
                    if (inventory.length === 0) {
                        return seedInventory();
                    } else {
                        console.log(chalk.magenta('Seems to already be inventory data, exiting!'));
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
});