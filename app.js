const { Trie } = require("./trie.js");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const port = process.env.PORT || 80;

app.use(bodyParser.urlencoded({
    extended: true
}));

var trie = new Trie();

app.get("/search/:word", function (req, res) {
    
});

app.get("/prefix/:word", function (req, res) {
    
});

app.get("/clear", function (req, res) {
    trie = new Trie();
    console.log("Trie has been cleared");
    res.send("The Trie has successfully been cleared");
});

app.post("/insert/:word", function (req, res) {
    
});

app.post("/delete/:word", function (req, res) {
    
});

// Turns on the server
app.listen(port, function () {
    console.log("Server has started running on port: " + port);
});