const Product = require('./index.js');
const data = require('../data.json');

const postData = objArr => {
	objArr.forEach(obj => {
		Product.create({
			id: obj.id,
			title: obj.title, 
			price: obj.price,
			salePrice: obj.salePrice, 
			reviewStars: obj.reviewStars, 
			reviewsTotal: obj.reviewsTotal,
			productPicture: obj.productPicture,
			tags: obj.tags, 
			kind: obj.kind, 
			specialTag: obj.specialTag
		})
	})
}

postData(data);

module.exports = postData;