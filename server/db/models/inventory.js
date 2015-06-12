var mongoose = require('mongoose');
var _ = require('lodash');


var schema = new mongoose.Schema({
  
  small: { type: Object },
  medium: { type: Object },
  large: { type: Object }
});

schema.virtual('totalQuantity').get(function() {
	var sumArray = [];
	for(var key in inventory) { 
		sumArray.push(_.pluck(inventory[key], 'quantity')); 
	}
	return _.sum(_.flatten(sumArray));
});


mongoose.model('Inventory', schema);