const Product = require('../database/index.js');

module.exports = {
	fetch: (req, res) => {
		const {id} = req.query;
		return Product.find({id: id}, ['tags'], (err, product) => {
			if (err) {
				res.status(404).send(err);
			} else {
				let itemTags = product[0].tags;
				return Product.find({ tags: {$in: itemTags } }, (err, products) => {
					if (err) {
						res.status(404).send(err);
					} else {
						res.status(200).send(products);
					}
				});
			}
		});
	}
};