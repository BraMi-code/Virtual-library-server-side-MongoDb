const Book = require("../models/book_model.js"),
        fs = require('fs');

const user = require("../models/user_model.js");

// Create and Save a new Book
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create Book
  const book = new Book({
    isbn: req.body.isbn,
    title: req.body.title,
    author: req.body.author,
    publish_date: req.body.publish_date,
    publisher: req.body.publisher,
    numOfPages: req.body.numOfPages,
    book_img: req.file.filename
  });

  // Save Book in the database
  Book.create(book, (err, data) => {
    console.log('book created');
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Book."
      });
    else res.send(data);
  });
};

// Retrieve all Books from the database.
exports.findAll = (req, res) => {
  Book.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving books."
      });
    else res.send(data);
  });
};

// Find a single Book with a bookId
exports.findOne = (req, res) => {
  Book.findById(req.params.bookId, (err, data) => {
    if (!req.params.bookId) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
    
    if (err) {
      if (err.kind === "not_found") {
        res.status(403).send({
          message:  "Not found Book with id " + req.params.bookId 
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Book with id " + req.params.bookId
        });
      }
    } else res.send(data);
  });
};


// Update a Book identified by the bookId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  // Update Book
  const book = new Book({
    isbn: req.body.isbn,
    title: req.body.title,
    author: req.body.author,
    publish_date: req.body.publish_date,
    publisher: req.body.publisher,
    numOfPages: req.body.numOfPages,
    book_img: req.file.filename
  });

  // Find path and remove File from folder
  Book.findImg(req.params.bookId, (err, data) => {
    var imgPath = process.env.PWD + '/uploads/' + data;
    console.log("Image Path: " + imgPath);
    if (err) {
      console.log("Some error occured");
    } else {
      fs.unlink(imgPath, (err) => {
        if (err) {
        console.error(err)
        return
        }
      })
    }
  });

  Book.updateById(
    req.params.bookId,
    book,
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Book with id ${req.params.bookId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Book with id " + req.params.bookId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Book with the specified bookId in the request
exports.delete = (req, res) => {
  // Find path and remove File from folder
  Book.findImg(req.params.bookId, (err, data) => {
    var imgPath = process.env.PWD + '/uploads/' + data;
    if (err) {
      console.log("Some error occured");
    } else {
      console.log(imgPath);
      fs.unlink(imgPath, (err) => {
      if (err) {
      console.error(err)
      return
      }
    })
    console.log(data + " file removed")
    }
  });

  Book.remove(req.params.bookId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Book with id ${req.params.bookId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Book with id " + req.params.bookId
        });
      }
    } else res.send({ message: `Book was deleted successfully!` });
  });
};