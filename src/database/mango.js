

const express = require('express');// conecting string
const { MongoClient } = require('mongodb');
let cs = "mongodb+srv://angelicliz03:<Key>@cluster0.gqadppj.mongodb.net/?retryWrites=true&w=majority"
let db;
let books;
async function start() {
    const client = new MongoClient(cs)
    await client.connect();
    db = client.db("test");//
    books = db.collection("books");
    console.log("Listening");
    app.listen(3001);
}
var app = express();
//Rickster's CORS middleware handler
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,PATCH,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    res.header('Cache-control', `no-store`)
    if (req.method === "OPTIONS") res.sendStatus(200);
    else next();
});
app.use(express.json());    // <==== parse request body as JSON

var StartBooks = new Map();
StartBooks.set("1", { id: "1", title: "React ins REACT", author: "Ben Dover", publisher: "Random House", isbn: "978-3-16-148410-0", avail: true, who: "", due: "" });
StartBooks.set("2", { id: "2", title: "Express-sions", author: "Frieda Livery", publisher: "Chaotic House", isbn: "978-3-16-148410-2", avail: true, who: "", due: "" });
StartBooks.set("3", { id: "3", title: "Restful REST", author: "Al Gorithm", publisher: "ACM", isbn: "978-3-16-143310-1", avail: true, who: "", due: "" });
StartBooks.set("4", { id: "4", title: "See Essess", author: "Anna Log", publisher: "O'Reilly", isbn: "987-6-54-148220-1", avail: false, who: "Homer", due: "1/1/23" });
StartBooks.set("5", { id: "5", title: "Scripting in JS", author: "Dee Gital", publisher: "IEEE", isbn: "987-6-54-321123-1", avail: false, who: "Marge", due: "1/2/23" });
StartBooks.set("6", { id: "6", title: "Be An HTML Hero", author: "Jen Neric", publisher: "Coders-R-Us", isbn: "987-6-54-321123-2", avail: false, who: "Lisa", due: "1/3/23" });
StartBooks.set("7", { id: "7", title: "What Would Buzzlightgear Do?", author: "Oprah Winfrey", publisher: "Stella Artuise", isbn: "9410829-3", avail: false, who: "Sam Jones", due: "07/8/2029" });
StartBooks.set("8", { id: "8", title: "The first time", author: "Cher", publisher: "Crazyness", isbn: "979-3456-3", avail: true, who: "", due: "" });
StartBooks.set("9", { id: "9", title: "Dont Be Extra", author: "Fred Clause", publisher: "Google", isbn: "979741728-987654-0", avail: false, who: "Morty", due: "1/18/23" });
StartBooks.set("10", { id: "10", title: "Game on", author: "Rickie James", publisher: "Houston Inc", isbn: "979-6-55628-0", avail: false, who: "Rick", due: "2/5/24" });





//-----------------------check-id--------------------------------
app.use('/books/:id', async function (req, res, next) {
    let _id = req.params.id;
    _id = _id.toString();
    let exists = await books.countDocuments({ id: _id }) > 0;

    // if (req.method == "DELETE" && !exists) {
    //     res.status(204).send(`${_id} not found`);
    //     return;
    // }
    if ((req.method == "PUT" || req.method == "GET") && !exists) {
        res.status(404).send(`${_id} not found`);
        return;
    }
    next();
});

app.get('/', function (req, res) {
    res.send("Hello grader!");
});

//---------------------------reset-database--------------------------
app.get('/reset', (req, res) => {
    const BooksArray = Array.from(StartBooks.values());
    console.log("deleted")
    books.deleteMany({})
        .then(dr => books.insertMany(BooksArray))
        .then(fr => res.send("resetted"));
})

//--------------------------------Books------------------------------
app.get('/books', (req, res) => {
    if (req.query.avail == undefined) {
        books.find()
            .project({ _id: 0, id: 1, title: 1 })
            .toArray()
            .then(allbooks => {
                res.send(JSON.stringify(allbooks))
                //res.send(allbooks)
            })
    } else {

        var _avail = ((req.query.avail).toLowerCase() === 'true');
        //console.log(_avail);

        books.find({ avail: _avail })
            .project({ _id: 0, id: 1, title: 1 })
            .toArray()
            .then(allbooks => {
                res.send(JSON.stringify(allbooks))
            })
    }
});
//--------------------------------ID----------------------------------
app.get('/books/:id', async (req, res) => {

    var _id = req.params.id;
    _id = _id.toString();

    var num = await books.countDocuments({});

    //console.log(num);

    books.findOne({ id: req.params.id })
        .then((book) => {
            if (book == null)
                res.status(404).send("not found")
            else res.send(JSON.stringify(book))
        })
})
//app.get('/books/:id', getone)
//async function getone(req,res) {
//  var book = await books.findOne( { id:req.params.id});
//  res.send(JSON.stringify(book));
//}
//---------------------------------update-------------------------------
app.put('/books/:id', async (req, res) => {
    var _id = req.params.id;
    _id = _id.toString();

    books.updateOne({ id: _id }, { $set: req.body });
    res.status(200).json("Updated");

});
app.delete('/books/:id', (req, res) => {

    books.findOne({ id: req.params.id })
        .then((book) => {
            if (book == null) {
                res.status(204).send("not found")
            }
            else {
                books.deleteOne({ id: req.params.id })
                res.status(200).send("deleted")
            }
        })

});
app.post('/books', async (req, res) => {
    var _id = req.body.id;
    _id = _id.toString();
    let exists = await books.countDocuments({ id: _id }) > 0;

    //console.log(exists);

    if (exists === true) {
        res.status(403).send("already exists");
    }
    else {
        // Books.set(_id, req.body);
        // res.sendStatus(201);
        books.insertOne(req.body);
        res.status(201).send("Created");
    }



});
start()