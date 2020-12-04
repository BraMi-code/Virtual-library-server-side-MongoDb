const sql = require("./database.js");

// constructor
const Book = function(book) {
  this.isbn = book.isbn;
  this.title = book.title;
  this.author = book.author;
  this.publish_date = book.publish_date;
  this.publisher = book.publisher;
  this.numOfPages = book.numOfPages;
  this.book_img = book.book_img
};

Book.create = (newBook, result) => {
  sql.query("INSERT INTO library SET ?", newBook, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created book: ", { isbn: res.insertId, ...newBook });
    result(null, { isbn: res.insertId, ...newBook });
  });
};

Book.findById = (bookId, result) => {
  sql.query(`SELECT * FROM library WHERE isbn = ${bookId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }    
    if (res.length) {
      console.log("found book: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Book with the id
    result({ kind: "not_found" }, null);
    console.log("Book not found");
  });
};

Book.getAll = result => {
  sql.query("SELECT * FROM library", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("books: ", res);
    result(null, res);
  });
};

Book.updateById = (isbn, book, result) => {
  sql.query(
    "UPDATE library SET isbn = ?, title = ?, author = ?, publish_date = ?, publisher = ?, numOfPages = ?, book_img = ? WHERE isbn = ?",
    [book.isbn, book.title, book.author, book.publish_date, book.publisher, book.numOfPages, book.book_img, isbn],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Book with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated book: ", { isbn: isbn, ...book });
      result(null, { isbn: isbn, ...book });
    }
  );
};

Book.findImg = (bookId, result) => {
  var reques = `SELECT book_img FROM library WHERE isbn = ${bookId}`;
  sql.query(reques, bookId, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    result(null, res[0].book_img);
  })
}

Book.remove = (isbn, result) => {
  sql.query("DELETE FROM library WHERE isbn = ?", isbn, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Book with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted book with isbn: ", isbn);
    result(null, res);
  });
};

module.exports = Book;