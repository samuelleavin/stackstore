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

schema.methods.getProductQuantity = function(sku) {
    var products = _.pluck(this.products, 'sku');

    var duplicates = _.filter(products, function(product) {
        return product === sku;
    });

    console.log("dupes", duplicates);

    return duplicates.length;
};

schema.virtual('orderStatus').get(function() {
    var status = this.status;
    if (status.created) return "Created";
    if (status.processing) return "In Processing";
    if (status.completed) return "Completed/Delivered";
    if (status.cancelled) return "Cancelled";
});

schema.virtual('quantity').get(function() {
    if (this.products.length === 1) {
        return "1 item";
    } else {
        console.log("hi");
        return this.products.length + " items";
    }
    
});

schema.virtual('subtotal').get(function() {
    var prices = _.pluck(this.products, 'price'); // array of prices
    return _.reduce(prices, function(total, n) {
        return total + n;
    });
});

// enable outputting of virtual attributes for toJSON if you are using express and res.send(page).
schema.set('toJSON', {
    virtuals: true
});



mongoose.model('Order', schema);
