var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    product_sku: { type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
    star_rating: { type: Number, min: 1, max: 5 },
    publish_date: { type: Date, default: Date.now },
    content: String
});

mongoose.model('Review', schema);
