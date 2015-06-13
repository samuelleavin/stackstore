var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	product: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Product'} ],
    purchase_date: { type: Date, default: Date.now },
    shipping_address: {
        street_address: String, //1234 Wall St.
        apt_number: String,
        city: String,
        state: String,
        country: String,
        zipcode: Number,
        phone: Number
    }
});


//Add capabilities for adding to cart directly onto the user model.
var addToCartBySku = function (userId, skuToAdd, callback) {

    var userPromise = this.findById(userId).populate('shopping_cart').exec();
    var itemPromise = this.model('Product').findOne({sku: skuToAdd}).exec();

    return Q.all([userPromise, itemPromise]).then(function (results) {

        var user = results[0], item = results[1];

        user.shopping_cart.push(item);

        user.save(callback);

        return user.shopping_cart;

    }, callback)

}
    schema.statics.addToCartBySku = addToCartBySku;





mongoose.model('Order', schema);