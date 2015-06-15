var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    sku: Number,
    name: String,
    photos: [ { type: String } ],
    description: String,
    category: String, //Tops, Bottoms
    type: String, // pants, shorts, skirts
    price: Number,
    gender: String,
    brand: String,
    onSale: Boolean,
    inventory: {type: mongoose.Schema.Types.ObjectId, ref: 'Inventory'}
});

schema.pre('save', function (next) {
    var self = this

    var defaults = {
        small: [{ color: null, quantity: 0}],
        medium: [{ color: null, quantity: 0}],
        large: [{ color: null, quantity: 0}],
        xlarge: [{ color: null, quantity: 0}]
    };

    if (!this.inventory) {
        mongoose.model('Inventory').create(defaults, function (err, newInv) {

            self.inventory = newInv._id;

            next();
        })    
    };
})


mongoose.model('Product', schema);
