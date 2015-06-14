var mongoose = require('mongoose');
var _ = require('lodash');

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

mongoose.model('Order', schema);
