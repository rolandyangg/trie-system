class Node {
    constructor(char) {
        this.char = char
        this.isEndOfWord = false; // Using a boolean over integer means that this trie does not allow duplicates
        this.children = {};
    }
}

class Trie {
    constructor() {
        this.root = new Node('');
    }

    /**
     * Inserts a word into the trie. Will create new nodes as necessary. Sets the final node isEndOfWord to true.
     * @param {String} word Word being inserted
     * @param {Node} node Current node that the insert method is on
     * @precondition word must be lowercase and contain only characters in the alphabet a-z 
     * @returns true or false depending on whether the word was successfully inserted or not
     */
    insert(word, node = this.root) {
        // End of the word has been found
        if (word.length === 0) {
            if (node.isEndOfWord)
                return false; // Word being inserted is a duplicate
            node.isEndOfWord = true;
            return true; // Word successfuly inserted
        }

        let char = word.charAt(0);

        // Create new node
        if (node.children[char] === undefined)
            node.children[char] = new Node(char);
        
        // Traverse downwards
        return this.insert(word.substring(1), node.children[char]);
    }

    /**
     * Searches for a word in the trie.
     * @param {String} word Word being searched for
     * @param {Node} node Current node that the search method is on
     * @precondition word must be lowercase and contain only characters in the alphabet a-z 
     * @returns true or false depending on whether the word was found or not
     */
    search(word, node = this.root) {
        if (node === undefined)
            return false;

        if (word.length === 0)
            return node.isEndOfWord;

        return this.search(word.substring(1), node.children[word.charAt(0)]);
    }

    delete(word) {

    }

    print() {
        /**
         * return each node data, height of tree, words in tree, and data for each node
         */
    }
}

trie = new Trie();
console.log(trie.insert('apple'));
console.log(trie.insert('apple'));
console.log(trie.search('apple'));
// console.log("apple".charAt(1));