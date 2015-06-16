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
    color: [ {} ],
    onSale: Boolean,
    inStock: Boolean,    //maybe a virtual for colors(?)
    inventory: { type: mongoose.Schema.Types.ObjectId, ref: 'Inventory'} 

});

/*schema.pre('save', function (next) {
    var self = this

    var defaults = {
        small: [{ color: null, quantity: null}],
        medium: [{ color: null, quantity: null}],
        large: [{ color: null, quantity: null}],
        xlarge: [{ color: null, quantity: null}]
    };

    if (!this.inventory) {
        mongoose.model('Inventory').create(defaults, function (err, newInv) {

            self.inventory = newInv._id;

            next();
        })    
    };
})*/


mongoose.model('Product', schema);
