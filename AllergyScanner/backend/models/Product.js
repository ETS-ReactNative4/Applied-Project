const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = mongoose.Schema({
    userFrom: {
        type: Schema.Types.ObjectId,
        ref:'user'
    },
    productId : {
        type:String
    },
    productName : {
        type: String
    },
    date: {
		type: Date,
		default: Date.now,
	},
})

const Product = mongoose.model('Product', productSchema);

module.exports = { Product }