var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    author: String, // email
    star_rating: Number,
    publish_date: { type: Date, default: Date.now },
    content: String
});

mongoose.model('Review', schema);