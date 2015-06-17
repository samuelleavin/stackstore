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
var Inventory = mongoose.model('Inventory');
var Promocode = mongoose.model('Promocode');
var q = require('q');
var chalk = require('chalk');
var _ = require('lodash');

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

var getCurrentPromocodes = function () {
    return q.ninvoke(Promocode, 'find', {});
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
            password: 'potus',
            admin: true,
            reset: false
        },

        {
            email: 'obama2@gmail.com',
            password: 'obama2',
            admin: false,
            reset: false
        },

        {
            email: 'obama3@gmail.com',
            password: 'obama3',
            admin: false,
            reset: true
        },

        {
            email: 'obama4@gmail.com',
            password: 'obama4',
            admin: false,
            reset: true

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
            small : [{ color : "blue", quantity: 5},
                     { color : "white", quantity: 5}],
            medium : [{ color : "blue", quantity: 5}],
            large : [{ color : "blue", quantity: 5}],
            xlarge : [{ color : "blue", quantity: 5}]
        },

        {
            product_sku: 100101,
            small : [{ color : "pink", quantity: 5},
                     { color : "black", quantity: 5}],
            medium : [{ color : "pink", quantity: 5},
                     { color : "black", quantity: 5}],
            large : [{ color : "pink", quantity: 5},
                     { color : "black", quantity: 5}],
            xlarge : [{ color : "pink", quantity: 5},
                     { color : "black", quantity: 5}]
        },

        {
            product_sku: 100102,
            small : [{ color : "blue", quantity: 5},
                     { color : "white", quantity: 5}],
            medium : [{ color : "blue", quantity: 5},
                     { color : "white", quantity: 5}],
            large : [{ color : "blue", quantity: 5},
                     { color : "white", quantity: 5}],
            xlarge : [{ color : "blue", quantity: 5},
                     { color : "white", quantity: 5}]
        },

        {
            product_sku: 100103,
            small : [{ color : "burgundy", quantity: 5},
                     { color : "blue", quantity: 5}],
            medium : [{ color : "burgundy", quantity: 5},
                     { color : "blue", quantity: 5}],
            large : [{ color : "burgundy", quantity: 5},
                     { color : "blue", quantity: 5}],
            xlarge : [{ color : "burgundy", quantity: 5},
                     { color : "blue", quantity: 5}]
        },

        {
            product_sku: 100201,
            small : [{ color : "black", quantity: 5},
                     { color : "white", quantity: 5}],
            medium : [{ color : "black", quantity: 5},
                     { color : "white", quantity: 5}],
            large : [{ color : "black", quantity: 5},
                     { color : "white", quantity: 5}],
            xlarge : [{ color : "black", quantity: 5},
                     { color : "white", quantity: 5}]
        },

        {
            product_sku: 100202,
            small : [{ color : "navy", quantity: 5},
                     { color : "oatmeal", quantity: 5}],
            medium : [{ color : "navy", quantity: 5},
                     { color : "oatmeal", quantity: 5}],
            large : [{ color : "navy", quantity: 5},
                     { color : "oatmeal", quantity: 5}],
            xlarge : [{ color : "navy", quantity: 5},
                     { color : "oatmeal", quantity: 5}]
        },

        {
            product_sku: 100400,
            small : [{ color : "navy", quantity: 5},
                     { color : "black", quantity: 5}],
            medium : [{ color : "navy", quantity: 5},
                     { color : "black", quantity: 5}],
            large : [{ color : "navy", quantity: 5},
                     { color : "black", quantity: 5}],
            xlarge : [{ color : "navy", quantity: 5},
                     { color : "black", quantity: 5}]
        },

        {
            product_sku: 100401,
            small : [{ color : "navy", quantity: 5},
                     { color : "black", quantity: 5}],
            medium : [{ color : "navy", quantity: 5},
                     { color : "black", quantity: 5}],
            large : [{ color : "navy", quantity: 5},
                     { color : "black", quantity: 5}],
            xlarge : [{ color : "navy", quantity: 5},
                     { color : "black", quantity: 5}]
        },

        {
            product_sku: 100402,
            small : [{ color : "denim", quantity: 5},
                     { color : "black", quantity: 5}],
            medium : [{ color : "denim", quantity: 5},
                     { color : "black", quantity: 5}],
            large : [{ color : "denim", quantity: 5},
                     { color : "black", quantity: 5}],
            xlarge : [{ color : "denim", quantity: 5},
                     { color : "black", quantity: 5}]
        },

        {
            product_sku: 100403,
            small : [{ color : "navy", quantity: 5},
                     { color : "khaki", quantity: 5}],
            medium : [{ color : "navy", quantity: 5},
                     { color : "khaki", quantity: 5}],
            large : [{ color : "navy", quantity: 5},
                     { color : "khaki", quantity: 5}],
            xlarge : [{ color : "navy", quantity: 5},
                     { color : "khaki", quantity: 5}]
        },

        {
            product_sku: 100404,
            small : [{ color : "black", quantity: 5},
                     { color : "khaki", quantity: 5}],
            medium : [{ color : "black", quantity: 5},
                     { color : "khaki", quantity: 5}],
            large : [{ color : "black", quantity: 5},
                     { color : "khaki", quantity: 5}],
            xlarge : [{ color : "black", quantity: 5},
                     { color : "khaki", quantity: 5}]
        }


    ];

    return q.invoke(Inventory, 'create', inventory);
};  

var seedProducts = function () {

    var products = [
        {
            sku: 100101,
            name: "Raglan Pocket Tee",
            photos: ["/images/basicsBlackTee.jpg", "/images/basicsBlackTee_back.jpg", "/images/basicsPinkTee.jpg", "/images/basicsPinkTee_back.jpg"],
            description: "It doesn't get more essential than this lightweight tee. Designed with comfort and versatility in mind, this piece features short raglan sleeves, a round neckline, and a single chest patch pocket.",
            category: "Tops", 
            type: "Short-Sleeve",
            price: 18.99,
            color: [{ name: "Pink", source: "/images/colorSwatches/basicTee_pink.jpg"}, { name: "Black", source: "/images/colorSwatches/basicTee_black.jpg" }],
            gender: "Women",
            brand: "Forever 21",
            brandInfo: "Launched in 1981 as Fashion 21, Forever 21 is now the 5th largest specialty retailer in the United States. Even with the company's teremendous growth and goal to become an $8 billion company by 2017, it still remains a family owned business.",
            //size: "Small",
            onSale: false,
            inStock: true
        },

         {
            sku: 100102,
            name: "Chambray Blouse",
            photos: ["/images/chambrayTop.jpg", "/images/chambrayTop_back.jpg", "/images/chambrayTop_whiteBack.jpg"],
            description: "Tailored features like a basic collar, a buttoned placket, and a chest pocket sharpen up this piece's relaxed silhouette. Crafted from a sleek chambray, this is the type of transitional piece that hits the sartorial sweet spot between dressed up and weekend-ready.",
            category: "Tops", 
            type: "Long-Sleeve",
            price: 34,
            color: [{ name: "Blue", source: "/images/colorSwatches/chambray.jpg"}, { name: "White", source: "/images/colorSwatches/chambrayTop_white.jpg"}],
            gender: "Women",
            brand: "Forever 21",
            brandInfo: "Launched in 1981 as Fashion 21, Forever 21 is now the 5th largest specialty retailer in the United States. Even with the company's teremendous growth and goal to become an $8 billion company by 2017, it still remains a family owned business.",
            //size: "Small",
            onSale: false,
            inStock: true
        },

        {
            sku: 100103,
            name: "Tartan Plaid Top",
            photos: ["/images/tartanShirt.jpg", "/images/tartanShirt_back.jpg", "/images/tartanTop_blueFront.jpg", "/images/TartanTop_blue.jpg"],
            description: "Wish you could carry your favorite flannel shirt into warmer months? With this top, you can! It has the button-down front, basic collar, and tartan plaid pattern that makes you gravitate toward this style, but its sleeveless design keeps it light so you can rock it throughout sunny seasons.",
            category: "Tops",
            type: "Short-Sleeve",
            price: 18,
            color: [{ name: "Burgundy", source: "/images/colorSwatches/redTartan.jpg" }, { name: "Blue", source: "/images/colorSwatches/blueTartan.jpg"}],
            gender: "Women",
            brand: "Forever 21",
            brandInfo: "Launched in 1981 as Fashion 21, Forever 21 is now the 5th largest specialty retailer in the United States. Even with the company's teremendous growth and goal to become an $8 billion company by 2017, it still remains a family owned business.",
            onSale: false,
            inStock: true
        },

        {
            sku: 100201,
            name: "Colorblocked Shirt Dress",
            photos: ["/images/colorblockedDress.jpg", "/images/colorblockedDress_back.jpg", "/images/colorblockedDress3.jpg", "/images/colorblockedDress4.jpg"],
            description: "With a half-colorblocked back, this shirt dress has major graphic impact. A hidden button-front packet and dropped hem with side vents keep it sleek and clean cut.",
            category: "Tops", 
            type: "Dress",
            price: 39.99,
            color: [{ name: "Black", source: "/images/colorSwatches/basicTee_black.jpg" }, { name: "White", source: "/images/colorSwatches/chambrayTop_white.jpg"}],
            gender: "Women",
            brand: "Forever 21",
            brandInfo: "Launched in 1981 as Fashion 21, Forever 21 is now the 5th largest specialty retailer in the United States. Even with the company's teremendous growth and goal to become an $8 billion company by 2017, it still remains a family owned business.",
            //size: "Small",
            onSale: false,
            inStock: true
        },

        {
            sku: 100202,
            name: "Striped Midi Dress",
            photos: ["/images/midi-dress.jpg", "/images/stripedDress2.jpg", "/images/stripedDress3.jpg", "/images/stripedDress4.jpg"],
            description: "This sleek midi dress's patterned stripes are horizontal on the front and vertical on the back. And the high-low vented hem is totally in line with its clean, modern silhouette.",
            category: "Tops",
            type: "Dresses",
            price: 29,
            color: [{ name: "Navy", source: "/images/colorSwatches/navy.jpg" }, { name: "Oatmeal", source: "/images/colorSwatches/oatmeal.jpg"}],
            gender: "Women",
            brand: "Forever 21",
            brandInfo: "Launched in 1981 as Fashion 21, Forever 21 is now the 5th largest specialty retailer in the United States. Even with the company's teremendous growth and goal to become an $8 billion company by 2017, it still remains a family owned business.",
            onSale: false,
            inStock: true
        },

         {
            sku: 100400,
            name: "Pleated Woven Pants",
            photos: ["/images/wovenpants_blueFront.jpg", "/images/wovenpants_blueSide.jpg", "/images/wovenpants_blackFront.jpg", "/images/wovenpants_blackBack.jpg"],
            description: "A pant that will take you from Monday mornings at the office to Saturday afternoons at park? Look no further! This pair is crafted from a durable cotton-blend with a bit of comfy stretch and features a flattering slim silhouette. The pleated front lends these a dressier feel (perfect for conquering that boardroom meeting), while slanted front pockets keep your essentials handy.",
            category: "Bottoms",
            type: "Pants",
            price: 42,
            color: [{ name: "Navy", source: "/images/colorSwatches/navy.jpg" }, { name: "Black", source: "/images/colorSwatches/basicTee_black.jpg"}],
            gender: "Women",
            brand: "Forever 21",
            brandInfo: "Launched in 1981 as Fashion 21, Forever 21 is now the 5th largest specialty retailer in the United States. Even with the company's teremendous growth and goal to become an $8 billion company by 2017, it still remains a family owned business.",
            //size: "Small",
            onSale: false,
            inStock: true
        },

         {
            sku: 100401,
            name: "Multi-Stripe Pleated Skirt",
            photos: ["/images/pleatedSkirt.jpg", "/images/pleatedSkirt_side.jpg", "/images/pleatedSkirt_fullSide.jpg", "/images/pleatedSkirt_back.jpg"],
            description: "Outfitted with nautical-inspired multi-stripes, this A-line skirt is the type of piece you can dress up or down.",
            category: "Bottoms",
            type: "Skirt",
            price: 36,
            color: [{ name: "Navy", source: "/images/colorSwatches/navy.jpg" }, { name: "Black", source: "/images/colorSwatches/basicTee_black.jpg"}],
            gender: "Women",
            brand: "Forever 21",
            brandInfo: "Launched in 1981 as Fashion 21, Forever 21 is now the 5th largest specialty retailer in the United States. Even with the company's teremendous growth and goal to become an $8 billion company by 2017, it still remains a family owned business.",
            //size: "Small",
            onSale: false,
            inStock: true
        },

        {
            sku: 100402,
            name: "Classic High-Waisted Jeans",
            photos: ["/images/highwaistedDenim.jpg", "/images/highwaistedDenim_side.jpg", "/images/highwaistedDenim_closeup.jpg", "/images/highwaistedDenim_back.jpg"],
            description: "Outfitted with all the classic trademarks like a five-pocket construction and a zip fly, these are finished with a pair-with-anything high-waisted fit.",
            category: "Bottoms",
            type: "Jeans",
            price: 78,
            color: [{ name: "Denim", source: "/images/colorSwatches/Denim.jpg" }, { name: "Black", source: "/images/colorSwatches/basicTee_black.jpg"}],
            gender: "Women",
            brand: "Forever 21",
            brandInfo: "Launched in 1981 as Fashion 21, Forever 21 is now the 5th largest specialty retailer in the United States. Even with the company's teremendous growth and goal to become an $8 billion company by 2017, it still remains a family owned business.",
            //size: "Small",
            onSale: false,
            inStock: true
        },

       {
            sku: 100403,
            name: "Uniform Trousers",
            photos: ["/images/schoolTrousers_blueFront.jpg", "/images/schoolTrousers_blueBack.jpg", "/images/schoolTrousers_blue.jpg", "/images/schoolTrousers_khacki.jpg"],
            description: "Crisp in their tailoring - see the sharply tapered legs, front slant pockets, and back welt pockets - and just as comfy with a slightly stretchy woven fabric, these trousers are a modern take on classic prep.",
            category: "Bottoms",
            type: "Pants",
            price: 34,
            color: [{ name: "Navy", source: "/images/colorSwatches/navy.jpg" }, { name: "Khaki", source: "/images/colorSwatches/khacki.jpg"}],
            gender: "Women",
            brand: "Forever 21",
            brandInfo: "Launched in 1981 as Fashion 21, Forever 21 is now the 5th largest specialty retailer in the United States. Even with the company's teremendous growth and goal to become an $8 billion company by 2017, it still remains a family owned business.",
            //size: "Small",
            onSale: false,
            inStock: true
        },

        {
            sku: 100404,
            name: "Flat-Front Chinos",
            photos: ["/images/chino_black.jpg", "/images/chino_blackBack.jpg", "/images/chino_blackSide.jpg", "/images/chino1.jpg"],
            description: "With these chinos, we subtracted the zip fly and belt loops, kept the flat front, and added vertical welt pockets.",
            category: "Bottoms",
            type: "Pants",
            price: 29,
            color: [{ name: "Black", source: "/images/colorSwatches/basicTee_black.jpg"}, { name: "Khaki", source: "/images/colorSwatches/khacki.jpg" }],
            gender: "Women",
            brand: "Forever 21",
            brandInfo: "Launched in 1981 as Fashion 21, Forever 21 is now the 5th largest specialty retailer in the United States. Even with the company's teremendous growth and goal to become an $8 billion company by 2017, it still remains a family owned business.",
            //size: "Small",
            onSale: false,
            inStock: true
        }

    ];

    return q.invoke(Product, 'create', products);

};

var seedReviews = function () {

    var reviews = [
        {   name: "Allison",
            product_sku: 100401,
            star_rating: 4,
            content: "Just a classic look."
        },

        {
            name: "Cat",
            product_sku: 100404,
            star_rating: 5,
            content: "I loved these!"
        },

        {
            name: "Kara",
            product_sku: 100402,
            star_rating: 4,
            content: "Very comfortable."
        },

        {
            name: "Suzi",
            product_sku: 100102,
            star_rating: 5,
            content: "Great for everyday wear."
        },

        {
            name: "Cathy",
            product_sku: 100403,
            star_rating: 1,
            content: "These looked like mom pants."
        },

        {
            name: "Julie",
            product_sku: 100202,
            star_rating: 3,
            content: "Great for Summer."
        }

    ];

    return q.invoke(Review, 'create', reviews);

};

var seedOrders = function () {


    var promiseForUser = User.findOne({ email: 'testing@fsa.com' }).exec();
    var promiseForProductOne = Product.findOne({sku: 100404}).exec();
    var promiseForProductTwo = Product.findOne({sku: 100202}).exec();

    return q.all([promiseForUser, promiseForProductOne, promiseForProductTwo])
    .then(function(results) {

        var pants = _.create(results[1]);
        var dress = _.create(results[2]);

        var orders = [
            {   // this customer id is hardcoded and might break 
                customer: results[0],
                shipping_address: {
                    street_address: '5678 Wall St',
                    apt_number: '3A',
                    city: 'New York',
                    state: 'NY',
                    country: 'USA',
                    zipcode: 11267,
                    phone: 1234567890
                },
                products: [ pants ],
                status: {
                    created: true,
                    processing: false,
                    completed: false,
                    cancelled: false
                }
            },

            {
                customer: results[0],
                shipping_address: {
                    street_address: '135 Pine St',
                    apt_number: '1B',
                    city: 'New York',
                    state: 'NY',
                    country: 'USA',
                    zipcode: 11345,
                    phone: 0987654321
                },
                products: [ dress, dress ],
                status: {
                    created: false,
                    processing: false,
                    completed: true,
                    cancelled: false
                }
            }
        ];

        return q.invoke(Order, 'create', orders);
    });
};

var seedPromocodes = function () {
    var promos = [
        {
            expires: new Date(2015, 7, 16),
            validFor: {
                categories: ['Tops']
            },
            discount: 15,
            promoCodeName: "123"
        },
        {
            expires: new Date(2016, 6, 16),
            validFor: {
                products: [100101, 100102]
            },
            discount: 25,
            promoCodeName: "abc"
        }
    ];

    return q.invoke(Promocode, 'create', promos);
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

                })

                .then(function() {
                    getCurrentPromocodes().then(function(promos) {
                        if (promos.length === 0) {
                            return seedPromocodes();
                        } else {
                            console.log(chalk.magenta('Seems to already be promo data, exiting!'));
                            process.kill(0);
                        }
                    });
                })

                .then(function() {
                    getCurrentInventoryData().then(function(inventory) {
                    if (inventory.length === 0) {
                        return seedInventory();
                    } else {
                        console.log(chalk.magenta('Seems to already be inventory data, exiting!'));
                        // process.kill(0);
                    }
    
                })

                .then(function (){
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