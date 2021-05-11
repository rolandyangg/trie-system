/**
 * SETUP
 */
// Dependencies
const { Trie } = require("./trie.js");
const express = require("express");
const bodyParser = require("body-parser");
const queue = require('express-queue');

// Setup Server
const app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(queue({activeLimit: 1, queuedLimited: -1 })); // Process only 1 request at a time, -1 means infinite tasks may be queued

// Global Variables
const port = process.env.PORT || 80;
var trie = new Trie();

/**
 * REST ENDPOINTS
 */
// GET
app.get("/search/:word", function (req, res) {
    res.send(trieMethod("SEARCH", req.params.word)); // true or false depending on found
});

app.get("/autocomplete/:prefix", function (req, res) {
    res.send(trieMethod("AUTOCOMPLETE", req.params.prefix)); // Array of words that can be autocompleted
});

app.get("/view", function (req, res) {
    res.send(trieMethod("VIEW", req.params.word)); // String representation of the Trie
});

// POST
app.post("/insert/:word", function (req, res) {
    res.send(trieMethod("INSERT", req.params.word)); // true or false depending on inserted successfully or duplicate
});

app.post("/delete/:word", function (req, res) {
    res.send(trieMethod("DELETE", req.params.word)); // true or false depending on deleted or not found
});

app.post("/clear", function (req, res) {
    res.send(trieMethod("CLEAR", req.params.word)); // true
});

/**
 * FUNCTIONS
 */
function trieMethod(method, word = null) {
    let result;

    // Log event
    console.log(`(${new Date().toUTCString()}) [${method}] ${word != null ? word : ''}`);

    // Preprocess data
    if (word != null) {
        // Check to see if word includes non-letters
        if (!word.match(/^[a-zA-Z]+$/)) {
            console.log(`${word} is INVALID`);
            return "INVALID";
        }
        word = word.toLowerCase();
    }
    
    switch (method) {
        case "SEARCH":
            result = trie.search(word);
            break;
        case "AUTOCOMPLETE":
            result = trie.autocomplete(word);
            break;
        case "VIEW":
            result = trie.toString();
            result = result.substring(0, result.length - 1); // Remove the newline at the end
            break;
        case "CLEAR":
            trie = new Trie();
            result = true;
            break;
        case "INSERT":
            result = trie.insert(word);
            break;
        case "DELETE":
            // If the word exists then it is deletable, else it can't be deleted
            result = trie.search(word);
            trie.delete(word);
            break;
        default:
            result = "Error!";
    }
    console.log(`(${new Date().toUTCString()}) [${method}] ${word != null ? word : ''} returned [${result}]`);
    return JSON.stringify(result);
}

// Turns on the server
app.listen(port, function () {
    console.log(`(${new Date().toUTCString()}) The Server has started running on port ${port}`);
});