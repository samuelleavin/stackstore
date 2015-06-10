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

mongoose.model('Order', schema);