class TrieNode {
    constructor() {
        this.child = {};
        this.endOfWord = false;
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode()

    }

    find(word) {
        let root = this.root;
        for (let char of word) {

            root = root.child[char]
        }

        return root ? root.endOfWord : false
    }

    findPrefix(word) {
        let root = this.root;
        let found = false;
        for (let char of word) {
            if (!root.child[char]) {
                found = false;
                break;
            } else {
                found = true;
            }
            root = root.child[char]
        }
        return found
    }

    insert(word) {
        let root = this.root;

        for (let char of word) {
            if (!root.child[char]) {
                root.child[char] = new TrieNode()

            }

            root = root.child[char]

        }
        root.endOfWord = true

    }

    delete(word) {

        this.root.child = this.deleteHelper(word, this.root.child, 0)

    }

    deleteHelper(word, current, idx) {
       
        const newCurrent = current[word[idx]]
        if(!newCurrent){
           return false 
        }
        const next = newCurrent.child

        if (idx === word.length - 1) {
            if (newCurrent.endOfWord) {
                newCurrent.endOfWord = false;
            }
            if (Object.keys(newCurrent.child).length === 0) {
                return {}
            } else {

                return current;
            }

        }
        const returnedResult = this.deleteHelper(word, next, idx + 1)
        current[word[idx]].child = returnedResult;
        if (current[word[idx]].endOfWord === false && Object.keys(current[word[idx]].child).length === 0) {

            return {}
        }

        return current;
    }

}

var trie = new Trie();

trie.insert("hello")
trie.insert("hell")
trie.delete("hell")