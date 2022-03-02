const mongoose = require("mongoose");

const FavouriteSchema = new mongoose.Schema({
    userFrom: {
        type: Schema.Types.ObjectId,
        ref:'user'
    },
	date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = Favourite = mongoose.model("favourite", FavouriteSchema);