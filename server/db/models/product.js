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
    color: [ {} ],
    onSale: Boolean,
    inStock: Boolean,    //maybe a virtual for colors(?)
    inventory: { type: mongoose.Schema.Types.ObjectId, ref: 'Inventory'} 
});


mongoose.model('Product', schema);