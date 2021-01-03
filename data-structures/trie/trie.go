package main

import "fmt"

type TrieNode struct {
	child     map[rune]*TrieNode
	endOfWord bool
}

type Trie struct {
	root *TrieNode
}

func (t *Trie) insert(word string) {
	root := t.root

	for _, char := range word {
		if root.child[char] == nil {
			root.child[char] = &TrieNode{make(map[rune]*TrieNode), false}
		}

		root = root.child[char]

	}
	root.endOfWord = true

}

func (t *Trie) find(word string) bool {
	root := t.root
	for _, char := range word {
		value := root.child[char]
		if value == nil {
			return false

		} else {
			root = value
		}

	}

	if root != nil {
		return root.endOfWord
	}
	return false

}

func (t *Trie) findPrefix(word string) bool {
	root := t.root
	for _, char := range word {
		value := root.child[char]
		if value == nil {
			return false

		} else {
			root = value
		}

	}

	if root != nil {
		return true
	}
	return false

}

func (t *Trie) delete(word string) {
	t.root.child = t.deleteHelper(word, t.root.child, 0)
}

func (t *Trie) deleteHelper(word string, current map[rune]*TrieNode, idx int) map[rune]*TrieNode {
	newCurrent := current[rune(word[idx])]
	if newCurrent == nil {
		return nil
	}
	next := newCurrent.child

	if idx == len(word)-1 {
		if newCurrent.endOfWord == true {
			newCurrent.endOfWord = false
		}
		if len(newCurrent.child) == 0 {
			return nil
		} else {

			return current
		}

	}
	returnedResult := t.deleteHelper(word, next, idx+1)
	current[rune(word[idx])].child = returnedResult
	if current[rune(word[idx])].endOfWord == false && len(current[rune(word[idx])].child) == 0 {

		return nil
	}

	return current
}

func (t *Trie) create() {
	t.root = &TrieNode{make(map[rune]*TrieNode), false}
}

func main() {
	trie := Trie{}
	trie.create()
	trie.insert("hello")
	trie.insert("helloworld")

	trie.delete("hello")

	fmt.Println(trie.find("helloworld"))

}
