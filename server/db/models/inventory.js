var mongoose = require('mongoose');
var _ = require('lodash');


var schema = new mongoose.Schema({
  product_sku: Number,
  small: Array,
  medium: Array,
  large: Array,
  xlarge: Array
});

schema.virtual('totalQuantity').get(function() {
	var sumArray = []; 
		sumArray.push(_.pluck(this['small'], 'quantity'));
		sumArray.push(_.pluck(this['medium'], 'quantity'));
		sumArray.push(_.pluck(this['large'], 'quantity')); 
		sumArray.push(_.pluck(this['xlarge'], 'quantity')); 
	return _.sum(_.flatten(sumArray));
});

// var x = new schema() {
// 	small: {color: "black", quantity: 5}
// }

// console.log(x.totalQuantity());

mongoose.model('Inventory', schema);