var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    sku: Number,
    name: String,
    photos: [ { type: String } ],
    description: String,
    category: String, //types of top or bottoms (pants, shorts, skirts)
    type: String, //top or bottom
    price: Number,
    gender: String,
    brand: String,
    onSale: Boolean,
    inStock: Boolean,
    inventory: { type: mongoose.Schema.Types.ObjectId, ref: 'Inventory'}
    //maybe a virtual for colors(?)
});


mongoose.model('Product', schema);