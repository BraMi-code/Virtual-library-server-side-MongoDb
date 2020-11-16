module.exports = app => {
  const book = require("../controllers/book_controller.js");

// Create a Book
app.post("/book", book.create);

// Get All Books
app.get("/books", book.findAll);

// Find One Book By ISBN
app.get("/book/:bookId", book.findOne);

// Delete a Book
app.delete("/book/:bookId", book.delete);

// Edit a Book
app.put("/book/:bookId", book.update);
}