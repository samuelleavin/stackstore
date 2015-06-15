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
        small: [{ color: 'black', quantity: 1}],
        medium: [{ color: 'white', quantity: 1}],
        large: [{ color: 'blue', quantity: 1}],
        xlarge: [{ color: 'pink', quantity: 1}]
    };

    if (!this.inventory) {
        mongoose.model('Inventory').create(defaults, function (err, newInv) {

            self.inventory = newInv._id;

            next();
        })    
    };
})


mongoose.model('Product', schema);
