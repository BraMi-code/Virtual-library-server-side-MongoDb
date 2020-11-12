const express = require('express');
const cors = require('cors');
const connection = require("/home/brami/mybooks/database.js");
const md5 = require("md5")

const app = express();
const port = process.env.APP_PORT;

app.use(cors());
app.options('*', cors());

app.use(express.urlencoded({ extended: false}));
app.use(express.json());

require("/home/brami/mybooks/routes/book_routes.js")(app);
require("/home/brami/mybooks/routes/user_routes.js")(app);

app.get('/', (req, res) => {
    res.send('Hello World, from express');
});

/*array to keep books
let books = [{
    "isbn": "9781593275846",
    "title": "Eloquent JavaScript, Second Edition",
    "author": "Marijn Haverbeke",
    "publish_date": "2014-12-14",
    "publisher": "No Starch Press",
    "numOfPages": 472,
},
{
    "isbn": "9781449331818",
    "title": "Learning JavaScript Design Patterns",
    "author": "Addy Osmani",
    "publish_date": "2012-07-01",
    "publisher": "O'Reilly Media",
    "numOfPages": 254,
},
{
    "isbn": "9781449365035",
    "title": "Speaking JavaScript",
    "author": "Axel Rauschmayer",
    "publish_date": "2014-02-01",
    "publisher": "O'Reilly Media",
    "numOfPages": 460,
}]; 


app.get('/', (req, res) => {
    res.send('Hello World, from express');
});

app.post('/book', (req, res) => {
        var book = {
            isbn: req.body.isbn,
            title: req.body.title,
            author: req.body.author,
            publish_date: req.body.publish_date,
            publisher: req.body.publisher,
            numOfPages: req.body.numOfPages
        }
        var sql ='INSERT INTO library (isbn, title, author, publish_date, publisher, numOfPages) VALUES (?,?,?,?,?,?)'
        var params =[book.isbn, book.title, book.author, book.publish_date, book.numOfPages, book.publisher, book.numOfPages]
        connection.query(sql, params, function (err, result) {
            if (err){
                res.status(400).json({"error": err.message})
                return;
            }
            res.json({
                "message": "success",
                "data": data,
                "id" : this.lastID
            })
        });
    });


app.get('/book', (req, res) => {
    res.json(books);
});

app.get('/book/:isbn', (req, res) => {
    // reading isbn from the URL
    const isbn = req.params.isbn;

    // searching books for the isbn
    for (let book of books) {
        if (book.isbn === isbn) {
            res.json(book);
            return;
        }
    }

    // sending 404 when not found something is a good practice
    res.status(404).send('Book not found');
});

app.delete('/book/:isbn', (req, res) => {
    // reading isbn from the URL
    const isbn = req.params.isbn;

    // remove item from the books array
    books = books.filter(i => {
        if (i.isbn !== isbn) {
            return true;
        }

        return false;
    });

    // sending 404 when not found something is a good practice
    res.send('Book is deleted');
});

app.post('/book/:isbn', (req, res) => {
    // reading isbn from the URL
    const isbn = req.params.isbn;
    const newBook = req.body;

    // remove item from the books array
    for (let i = 0; i < books.length; i++) {
        let book = books[i]

        if (book.isbn === isbn) {
            books[i] = newBook;
        }
    }

    // sending 404 when not found something is a good practice
    res.send('Book is edited');
});
*/

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`))