const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/suggestions');

var db = mongoose.connection;
db.on('error', (err)=> console.log('connection error: ', err));
db.once('open', () => console.log('mongo is connected'));

const productSchema = new mongoose.Schema({
    id: { //corresponds with justin's id
        type: Number,
        unique: true
      },
      title: String, //name of shoe
      price: Number, 
      salePrice: Number, //null if no sale
      reviewStars: Number, //out of 5
      reviewsTotal: Number,
      productPicture: String, //url
      tags: Array, //corresponds with justin, how it will choose suggestions
      kind: String, //title right under shoe in grey
      specialTag: String //null if none,       
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;

