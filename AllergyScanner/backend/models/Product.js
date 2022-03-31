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
    
    newMatches: [{
        type: String
    }],
    ingredients : {
        type: [String]
    },
    allergens: {
        type: [{
            title : String,
            key : String
        }],
        default: undefined
    },
    traces: [{
        type:String
    }],
    date: {
		type: Date,
		default: Date.now,
	},
})

const Product = mongoose.model('Product', productSchema);

module.exports = { Product }