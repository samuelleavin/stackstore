var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    sku: Number,
    name: String,
    photos: [ { type: String } ],
    description: String,
    category: String, //types of top or bottoms (pants, shorts, skirts)
    type: String, //top or bottom
    price: Number,
    color: [ String ],
    gender: String,
    brand: String,
    size: String,
    onSale: Boolean,
    inStock: Boolean,
    reviews: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Review'} ]

});


mongoose.model('Product', schema);