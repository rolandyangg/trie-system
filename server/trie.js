class Node {
    constructor(char) {
        this.char = char
        this.isEndOfWord = false; // Using a boolean over integer means that this Trie does not allow duplicates
        this.children = {};
    }
}

class Trie {
    constructor() {
        this.root = new Node('');
    }

    /**
     * Traverses and obtains the final node of the given word if it exists
     * @param {String} word Word being traversed to
     * @param {Node} node Current node that is being traversed
     * @returns {Node} The final node of the given word or undefined otherwise
     */
    traverseHelper(word, node = this.root) {
        // Reached the bottom, node doesn't exist
        if (node === undefined)
            return undefined;
        
        // Successfully traversed to the node of the word
        if (word.length === 0)
            return node;
        
        // Traverse downwards
        return this.traverseHelper(word.substring(1), node.children[word.charAt(0)]);
    }

    /**
     * Searches to see if a given word is stored in the Trie
     * @param {String} word Word being searched for
     * @returns {boolean} True or false depending if the word exists in the tree or not
     */
    search(word) {
        let result = this.traverseHelper(word);
        if (result === undefined)
            return false;
        return result.isEndOfWord ? true : false;
    }

    /**
     * Inserts a word into the Trie. Will create new nodes as necessary. Sets the final node isEndOfWord to true.
     * @param {String} word Word being inserted
     * @param {Node} node Current node that is being traversed
     * @returns true or false depending on whether the word was successfully inserted or not
     */
    insert(word, node = this.root) {
        // End of the word has been found
        if (word.length === 0) {

            // Check for duplicate
            if (node.isEndOfWord)
                return false; 

            node.isEndOfWord = true;

            // Word successfuly inserted
            return true;
        }

        let char = word.charAt(0);

        // Create new node
        if (node.children[char] === undefined)
            node.children[char] = new Node(char);
        
        // Traverse downwards
        return this.insert(word.substring(1), node.children[char]);
    }

    /**
     * Deletes a word in the Trie if the word exists
     * @param {*} word Word being deleted
     * @param {*} node Current node that is being traversed
     * @returns The root of the Trie or undefined if there is no more nodes in the Trie
     */
    delete(word, node = this.root) {
        // Reached the bottom, node doesn't exist
        if (node === undefined)
            return undefined;

        // Successfully traversed to the node of the word
        if (word.length === 0) {
            // "Delete" the word from the Trie
            if (node.isEndOfWord)
                node.isEndOfWord = false;
            
            // Leaf node case
            if (Object.keys(node.children).length === 0)
                node = undefined;

            return node;
        }

        // To check for the deletion of the nodes below
        let childNode = this.delete(word.substring(1), node.children[word.charAt(0)]);

        // Unlink the node
        if (childNode === undefined)
            delete node.children[word.charAt(0)];

        // Delete node if it becomes leaf node as well after deleting
        if (Object.keys(node.children).length === 0 && !node.isEndOfWord)
            node = undefined;

        return node;
    }

    /**
     * Finds a list of words that the given word could autocomplete to out of the words in the Trie
     * @param {String} word Word being autocompleted
     * @param {Node} node Current node that the autocomplete method is on
     * @param {Array} list List of found words
     * @returns {Array} A list of words that the given word could autocomplete to
     */
    autocomplete(word, node = this.traverseHelper(word), list = []) {
        // Reached the bottom, node doesn't exist
        if (node === undefined)
            return list;
        
        if (node.isEndOfWord)
            list.push(word);

        // Traverse through all nodes below the prefix
        for (const char in node.children)
            list = this.autocomplete(word + char, node.children[char], list);
        
        return list;
    }

    /**
     * Returns a String representation of the Trie, depth represented by the amount of -
     * @returns {String} Data on the Trie
     */
    toString(word = '', node = this.root, result = '') {

        if (node === undefined)
            return result;

        result += `${word}${node.isEndOfWord ? " (TRIE WORD)" : ""}\n`;

        for (const char in node.children)
            result = this.toString("-" + word + char, node.children[char], result);

        return result;
    }
}

module.exports = { Trie };

var trie = new Trie();