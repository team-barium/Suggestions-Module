const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/suggestions');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('mongo is connected')
});

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
      kind: String     
});

const Product = mongoose.model('Product', productSchema);

