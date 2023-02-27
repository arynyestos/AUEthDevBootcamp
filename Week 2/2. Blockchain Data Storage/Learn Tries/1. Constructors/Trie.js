const TrieNode = require('./TrieNode');

class Trie {
    constructor() {
        this.root = new TrieNode(null)
    }

    insert(word) {
        const chars = word.split('')
        let currentNode = this.root
        for (let i = 0; i <= chars.length; i++) {
            let childNode = new TrieNode(chars[i])
            if (Object.values(currentNode.children).every(child => child.key !== childNode.key)) {
                if (i !== chars.length) {
                    currentNode.children[chars[i]] = childNode
                    currentNode.isWord = false
                }
                else currentNode.isWord = true
                currentNode = childNode
            }
            else currentNode = currentNode.children[childNode.key]
        }
    }

    contains(word) {
        const chars = word.split('')
        let currentNode = this.root
        for (let i = 0; i < chars.length; i++) {
            if (currentNode.children[chars[i]] !== undefined) {
                currentNode = currentNode.children[chars[i]]
            }
            else return false
        }
        if (currentNode.isWord) return true
    }
}

module.exports = Trie;