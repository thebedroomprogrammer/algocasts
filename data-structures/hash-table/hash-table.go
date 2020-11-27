package main

import (
	"math"
)

type Set struct {
	key   string
	value interface{}
}

type HTable struct {
	keyMap [][]Set
}

func (ht *HTable) hash(key string) int {
	var total int
	PRIME := 31

	for i := 0; i < int(math.Min(float64(len(key)), 100)); i++ {
		char := key[i]
		value := char - 96
		total = (total*PRIME + int(value)) % len(ht.keyMap)
	}

	return total
}

func (ht *HTable) set(key string, value interface{}) int {
	index := ht.hash(key)
	if len(ht.keyMap[index]) > 0 {
		for i := 0; i < len(ht.keyMap[index]); i++ {
			if ht.keyMap[index][i].key == key {
				ht.keyMap[index][i].value = value
				return index
			}
		}
	}
	ht.keyMap[index] = append(ht.keyMap[index], Set{key, value})
	return index
}

func (ht *HTable) keys() []string {
	var keys []string
	for i := 0; i < len(ht.keyMap); i++ {
		for j := 0; j < len(ht.keyMap[i]); j++ {
			freshKey := true
			for _, key := range keys {
				if key == ht.keyMap[i][j].key {

					freshKey = false
				}
			}
			if freshKey == true {
				keys = append(keys, ht.keyMap[i][j].key)
			}
		}
	}
	return keys
}

func (ht *HTable) values() []interface{} {
	var values []interface{}
	for i := 0; i < len(ht.keyMap); i++ {
		for j := 0; j < len(ht.keyMap[i]); j++ {
			freshValue := true
			for _, value := range values {
				if value == ht.keyMap[i][j].value {
					freshValue = false
				}
			}
			if freshValue == true {
				values = append(values, ht.keyMap[i][j].value)
			}
		}
	}
	return values
}

//     values() {
//         let values = [];
//         for (let i = 0; i < this.keyMap.length; i++) {
//             if (this.keyMap[i]) {
//                 for (let j = 0; j < this.keyMap[i].length; j++) {
//                      if(!values.includes(this.keyMap[i][j][1])){
//                           values.push(this.keyMap[i][j][1])
//                      }

//                 }
//             }

//         }
//         return values
//     }

func (ht *HTable) get(key string) interface{} {
	index := ht.hash(key)
	if len(ht.keyMap[index]) > 0 {
		for i := 0; i < len(ht.keyMap[index]); i++ {
			if ht.keyMap[index][i].key == key {
				return ht.keyMap[index][i].value

			}
		}
	}
	return nil
}

func HashTable(size int) *HTable {
	htable := HTable{make([][]Set, 53)}
	return &htable
}

func main() {
	ht := HashTable(53)
	ht.set("one", "1")
	ht.set("two", "2")
	ht.set("three", "3")
	ht.set("four", "4")
	ht.set("five", "5")
	ht.set("six", "6")
	ht.set("seven", "7")
	ht.set("eigth", "8")
	ht.set("nine", "9")
	ht.set("ten", "10")
}
