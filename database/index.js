const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/suggestions');

var db = mongoose.connection;
db.on('error', (err) => console.log('connection error: ', err));
db.once('open', () => console.log('mongo is connected'));

const productSchema = new mongoose.Schema({
	id: { 
		type: Number,
		unique: true
	},
	title: String, 
	price: Number, 
	salePrice: Number, 
	reviewStars: Number,
	reviewsTotal: Number,
	productPicture: String, 
	tags: Array, 
	kind: String, 
	specialTag: String     
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;

