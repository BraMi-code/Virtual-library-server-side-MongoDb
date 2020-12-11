module.exports = app => {
  const book = require("../controllers/book_controller.js");
  const users = require("../controllers/user_controller.js");
  const multer  = require('multer');
  const path = require('path');

  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
    }
  })
  
  const upload = multer({ storage: storage });
  
// Create a Book
//app.post("/book", book.create);
app.post("/book", [users.authenticateToken, upload.single('book_img')], book.create);

// Get All Books
app.get("/books", book.findAll);

// Find One Book By ISBN
app.get("/book/:bookId", book.findOne);

// Delete a Book
app.delete("/book/:bookId", users.authenticateToken, book.delete);

// Edit a Book
app.put("/book/:bookId",  [users.authenticateToken, upload.single('book_img')], book.update);
}