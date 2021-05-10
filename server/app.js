const { Trie, checkWord } = require("./trie.js");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const port = process.env.PORT || 80;

app.use(bodyParser.urlencoded({
    extended: true
}));

var trie = new Trie();

app.get("/search/:word", function (req, res) {
    let word = req.params.word;
    console.log(`(${new Date().toUTCString()}) User has requested to SEARCH for the word "${word}"`);
    let result = "";
    if (checkWord(word)) {
        result = trie.search(word.toLowerCase());
        console.log(`The result of SEARCH for "${word}" was: ${result}`);
    } else {
        result = "INVALID";
        console.log(`"${word}" is an INVALID input. Failed to SEARCH`);
    }
    res.send(result);
});

app.get("/autocomplete/:word", function (req, res) {
    let word = req.params.word;
    console.log(`(${new Date().toUTCString()}) User has requested to AUTOCOMPLETE for the word "${word}"`);
    let result = "";
    if (checkWord(word)) {
        result = trie.autocomplete(word.toLowerCase());
        console.log(`The result of AUTOCOMPLETE for "${word}" was: ${result}`);
    } else {
        result = "INVALID";
        console.log(`"${word}" is an INVALID input. Failed to SEARCH`);
    }
    res.send(result);
});

app.get("/view", function (req, res) {
    console.log(`(${new Date().toUTCString()}) User has requested to VIEW the Trie`);
    let result = trie.toString();
    result = result.substring(0, result.length - 1);
    console.log(result);
    res.send(result);
});

app.get("/clear", function (req, res) {
    console.log(`(${new Date().toUTCString()}) User has requested to CLEAR the Trie`);
    trie = new Trie();
    console.log("Trie has been cleared");
    res.send(true);
});

app.post("/insert/:word", function (req, res) {
    let word = req.params.word;
    console.log(`(${new Date().toUTCString()}) User has requested to SEARCH for the word "${word}"`);
    let result = "";
    if (checkWord(word)) {
        result = trie.insert(word.toLowerCase());
        console.log(`The result of SEARCH for "${word}" was: ${result}`);
    } else {
        result = "INVALID";
        console.log(`"${word}" is an INVALID input. Failed to INSERT`);
    }
    res.send(result);
});

app.post("/delete/:word", function (req, res) {
    let word = req.params.word;
    console.log(`(${new Date().toUTCString()}) User has requested to DELETE for the word "${word}"`);
    let result = "";
    if (checkWord(word)) {
        result = trie.delete(word.toLowerCase());
        console.log(`The result of DELETE for "${word}" was: ${result}`);
    } else {
        result = "INVALID";
        console.log(`"${word}" is an INVALID input. Failed to DELETE`);
    }
    res.send(result);
});

// Turns on the server
app.listen(port, function () {
    console.log(`(${new Date().toUTCString()}) The Server has started running on port ${port}`);
});