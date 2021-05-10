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

    insert(word, node = trie.root) {
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

    delete(word) {

    }
    
    search(word) {

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
// console.log("apple".charAt(1));