const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Allergens model
const allergenSchema = mongoose.Schema({

    userFrom: {
        type: Schema.Types.ObjectId,
        ref:'user'
    },
    
     title: {
            type: String
        },
    key: {
            type: String
        },
    
    date: {
		type: Date,
		default: Date.now,
	},
})

const Allergens = mongoose.model('Allergens', allergenSchema);

module.exports = { Allergens }