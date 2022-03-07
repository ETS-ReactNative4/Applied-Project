const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favouriteSchema = mongoose.Schema({
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
    allergenMatches : {
        type: [String]
    },
    date: {
		type: Date,
		default: Date.now,
	},
})

const Favourite = mongoose.model('Favourite', favouriteSchema);

module.exports = { Favourite }