let mongoose = require("mongoose"); //Interact with mongo

// General Schema
let genreSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	create_date: {
		type: Date,
		default: Date.now()
	}
});

let Genre = (module.exports = mongoose.model("Genre", genreSchema));

// Get Genres
module.exports.getGenres = (callback, limit) => {
	Genre.find(callback).limit(limit);
};

// Add Genre
module.exports.addGenre = (genre, callback) => {
	Genre.create(genre, callback);
};

// Update Genre
module.exports.updateGenre = (id, genre, options, callback) => {
	let query = { _id: id };
	let update = {
		name: genre.name
	};

	Genre.findOneAndUpdate(query, update, options, callback);
};

// Delete Genre
module.exports.removeGenre = (id, callback) => {
	let query = { _id: id };
	Genre.remove(query, callback);
};
