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
     * Traverses and obtains the final node of the given word
     * @param {String} word Word being searched for
     * @param {Node} node Current node that the reach method is on
     * @precondition word must be lowercase and contain only characters in the alphabet a-z 
     * @returns The final node of the given word if it exists or undefined otherwise
     */
    reachNode(word, node) {
        if (node === undefined)
            return undefined;
        
        if (word.length === 0)
            return node;
        
        return this.reachNode(word.substring(1), node.children[word.charAt(0)]);
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
     * @precondition word must be lowercase and contain only characters in the alphabet a-z 
     * @returns true or false depending on if whether word was successfully found
     */
    search(word) {
        let temp = this.reachNode(word, this.root);
        if (temp === undefined)
            return false;
        return temp.isEndOfWord;
    }

    delete(word, node = this.root) {
        console.log(node);
        if (node === undefined)
            return false;

        // Successfully traversed to the end of the word
        if (word.length === 0) {
            if (node.isEndOfWord) {
                if (depended) // If a prefix depends on this char then leave it so it still exists
                    node.isEndOfWord = false;
                return true;
            }
            return false;
        }

        // Traverse downwards
        let deleted =  this.delete(word.substring(1), node.children[word.charAt(0)]);
        
        return deleted;
    }

    /**
     * Finds a list of words that the given word could autocomplete to out of the words in the Trie
     * @param {String} word Word being autocompleted
     * @param {Node} node Current node that the autocomplete method is on
     * @param {Array} list List of found words
     * @returns A list of words that the given word could autocomplete to
     */
    autocomplete(word, node = this.reachNode(word, this.root), list = []) {
        if (node === undefined)
            return list;
        
        if (node.isEndOfWord)
            list.push(word);

        for (const char in node.children)
            list = this.autocomplete(word + char, node.children[char], list);
        
        return list;
    }

    /**
     * Returns a String representation of the Trie, containing the contents and metadata of the Trie
     * @returns Data on the Trie
     */
    toString() {
        let result = "The Trie contains the following words:\n"
        const words = this.autocomplete('');
        for (let i = 0; i < words.length; i++)
            result += words[i] + '\n';
        return result;
    }
}

function checkWord(word) {
    return word.match(/^[a-zA-Z]+$/) ? true : false;
}

module.exports = { Trie, checkWord };

/*
trie = new Trie();
console.log(trie.insert("the"));
console.log(trie.insert("there"));
console.log(trie.insert("them"));
console.log(trie.insert('into'))
console.log(trie.autocomplete(''));
console.log(trie.toString());*/
// console.log(new Date().toUTCString());