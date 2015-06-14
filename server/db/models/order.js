var mongoose = require('mongoose');
var _ = require('lodash');
var Q = require('q');

var schema = new mongoose.Schema({
	customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    products: [ {} ],
	// product: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Product'} ],
    purchase_date: { type: Date, default: Date.now },
    shipping_address: {
        street_address: String, //1234 Wall St.
        apt_number: String,
        city: String,
        state: String,
        country: String,
        zipcode: Number,
        phone: Number
    },
    status: {
        created: Boolean,
        processing: Boolean,
        completed: Boolean,
        cancelled: Boolean
    },
    promocode: String

});

schema.methods.addProduct = function(sku, callback) {
    var self = this;
    return this.model('Product').findOne({sku: sku}).exec()
        .then(function(product) {
            var copy = _.create(_.omit(product, 'inStock'));
            self.products.push(copy);
            self.save(function(err) {
                if (err) callback(err);
            });
        });
};

var addToUsersOrderHistory = function (userId, userInfoToAdd, cartInfoToAdd, callback) {

    var orderPromise = this.create(userInfoToAdd);
    var userPromise = this.model('User').findById(userId).exec();
    console.log("this is the userPromise", userPromise)
    
    return Q.all([orderPromise, userPromise]).then(function (results) {
        console.log("this is inside the Q.all promise", results);
        var order = results[0], user = results[1];
        
        user.shopping_cart = [];

        user.order_history.push(order);

        user.shipping_address = userInfoToAdd.shipping_address;

        user.payment_info = userInfoToAdd.payment_info;

        user.save(callback);

        return; 
        
    }, callback)

}

schema.statics.addToUsersOrderHistory = addToUsersOrderHistory;



mongoose.model('Order', schema);
