let mongoose = require("mongoose");

// General Schema
let bookSchema = mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	genre: {
		type: String,
		required: true
	},
	description: {
		type: String
	},
	author: {
		type: String,
		required: true
	},
	publisher: {
		type: String
	},
	pages: {
		type: String
	},
	image_url: {
		type: String
	},
	buy_url: {
		type: String
	},
	create_date: {
		type: Date,
		default: Date.now
	}
});

let Book = (module.exports = mongoose.model("Book", bookSchema));

// Get Books
module.exports.getBooks = (callback, limit) => {
	Book.find(callback).limit(limit);
};

// Get Book
module.exports.getBookById = (id, callback) => {
	Book.findById(id, callback);
};

// Add Book
module.exports.addBook = (book, callback) => {
	Book.create(book, callback);
};

// Update Book
module.exports.updateBook = (id, book, options, callback) => {
	let query = { _id: id };
	let update = {
		title: book.title,
		genre: book.genre,
		description: book.description,
		author: book.author,
		publisher: book.publisher,
		image_url: book.image_url,
		buy_url: book.buy_url,
		pages: book.pages
	};

	Book.findOneAndUpdate(query, update, options, callback);
};

// Delete Book
module.exports.removeBook = (id, callback) => {
	let query = { _id: id };
	Genre.remove(query, callback);
};