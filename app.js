let express = require("express");
let app = express();
let bodyParser = require("body-parser");
let mongoose = require("mongoose");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

Genre = require("./models/genre");
Book = require("./models/book");

// Connect to Mongoose
mongoose.connect("mongodb://localhost/bookstore", { useNewUrlParser: true }); //Might want to look into more detail on how connecting works
mongoose.set("useFindAndModify", false);
let db = mongoose.connection;


// Routes
app.get("/", (req, res) => {
	res.send("Please use /api/books or /api/genres");
});

//Genres Routes
app.get("/api/genres", (req, res) => {
	Genre.getGenres((err, genres) => {
		if (err) {
			console.log(err);
		}
		res.json(genres);
	});
});

//New Genre
app.post("/api/genres", (req, res) => {
	let genre = new Genre(req.body);

	Genre.addGenre(genre, (err, genre) => {
		if (err) {
			console.log(err);
		}
		res.json(genre);
	});
});

// Update Genre
app.put("/api/genres/:_id", (req, res) => {
	let id = req.params._id;
	let genre = req.body;

	Genre.updateGenre(id, genre, {}, (err, genre) => {
		if (err) {
			console.log(err);
		}
		res.json(genre);
	});
});

// Delete Genre
app.delete("/api/genres/:_id", (req, res) => {
	let id = req.params._id;

	Genre.removeGenre(id, (err, genre) => {
		if (err) {
			console.log(err);
		}
		res.json(genre);
	});
});

// Books Routes
app.get("/api/books", (req, res) => {
	Book.getBooks((err, books) => {
		if (err) {
			console.log(err);
		}
		res.json(books);
	});
});

app.get("/api/books/:_id", (req, res) => {
	Book.getBookById(req.params._id, (err, book) => {
		if (err) {
			console.log(err);
		}
		res.json(book);
	});
});

app.post("/api/books", (req, res) => {
	let book = new Book(req.body);

	Book.addBook(book, (err, book) => {
		if (err) {
			console.log(err);
		}
		res.json(book);
	});
});

app.put("/api/books/:_id", (req, res) => {
	let id = req.params._id;
	let book = req.body;

	Book.updateBook(id, book, {}, (err, book) => {
		if (err) {
			console.log(err);
		}
		res.json(book);
	});
});

app.delete("/api/books/:_id", (req, res) => {
	let id = req.params._id;

	Book.removeBook(id, (err, book) => {
		if (err) {
			console.log(err);
		}
		res.json(book);
	});
});

app.listen(3000);
console.log("Running on port 3000...");
