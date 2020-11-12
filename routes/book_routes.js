module.exports = app => {
    const books = require("../controllers/book_controller.js");
  
    // Create a new Customer
    app.post("/book", books.create);
  
    // Retrieve all Customers
    app.get("/books", books.findAll);
  
    // Retrieve a single Customer with customerId
    app.get("/book/:bookId", books.findOne);
  
    // Update a Customer with customerId
    app.put("/book/:bookId", books.update);
  
    // Delete a Customer with customerId
    app.delete("/book/:bookId", books.delete);
  
    // Create a new Customer
    app.delete("/books", books.deleteAll);
  };