const MongoClient = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017/';

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
  MongoClient.connect(url, function(err, db) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    var dbo = db.db(process.env.DB_NAME);
    console.log(newBook);
    var query = { isbn: newBook.isbn };
    dbo.collection(process.env.CL_BOOKS).find(query).toArray(function(err,res) {
      if (err) {
        result(err, null);
        return;
      }
      // book with this isbn already exists
      if (res.length) {
      result({ msg: "This book is already created" }, null);
      db.close();
      return;
      }
    });
    // if book with isbn doesn't exists insert new book
    dbo.collection(process.env.CL_BOOKS).insert(newBook, function(err, res) {
      if (err) throw err;
      console.log("Book created", res);
      result(null, { ...newBook});
      db.close();
    });
  });
};

Book.findById = (bookId, result) => {
  MongoClient.connect(url, function(err, db) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }    
    var dbo = db.db(process.env.DB_NAME);
    var query = { isbn: bookId };

    dbo.collection(process.env.CL_BOOKS).find(query).toArray(function(err,res) {
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
  });
}

Book.getAll = result => {
  MongoClient.connect(url, function(err, db) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    var dbo = db.db(process.env.DB_NAME);
    dbo.collection(process.env.CL_BOOKS).find({}).toArray(function(err,res) {
      if (err) {
        result(err, null);
        return;
      }
    console.log("books: ", res);
    result(null, res);
    db.close();
    });
  });
}

Book.updateById = (isbn, book, result) => {
  MongoClient.connect(url, function(err, db) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    var dbo = db.db(process.env.DB_NAME);
    var query = { isbn: isbn };

    var newValues = { $set: { isbn: book.isbn, title: book.title, author: book.author, publish_date: book.publish_date, publisher: book.publisher, numOfPages: book.numOfPages, book_img: book.book_img, isbn } };

    dbo.collection(process.env.CL_BOOKS).update(query, newValues, function(err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (res.affectedRows == 0) {
        // not found Book with the id
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("updated book: ", { isbn: isbn, ...book });
      result(null, { isbn: isbn, ...book });
      db.close();
    });
  });
}

Book.findImg = (bookId, result) => {
  MongoClient.connect(url, function(err, db) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    var dbo = db.db(process.env.DB_NAME);
    var query = { isbn: bookId };
    dbo.collection(process.env.CL_BOOKS).find(query).toArray(function (err,res) {
      if (err) {
        result(err, null);
        return;
      }
    result(null, res[0].book_img);
    db.close();
    });
  });
}

Book.remove = (isbn, result) => {
  MongoClient.connect(url, function(err, db) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    var dbo = db.db(process.env.DB_NAME);
    var query = { isbn: isbn };
    console.log(query);
    dbo.collection(process.env.CL_BOOKS).remove(query, function(err, res) {
      if (err) throw err;
      console.log("deleted book with isbn: ", isbn);
      result(null, res);
      db.close();
     });
  });
};

module.exports = Book;