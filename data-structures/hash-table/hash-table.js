class HashTable {
    constructor(size=53) {
        this.keyMap = new Array(size)
    }

    _hash(key) {
        let total = 0;
        let PRIME = 31;
        for (let i = 0; i < Math.min(key.length, 100); i++) {
            let char = key[i];
            let value = char.charCodeAt(0) - 96;
            total = (total * PRIME + value) % this.keyMap.length;
        }

        return total
    }

    set(key, value) {
        let index = this._hash(key, value);

        if (!this.keyMap[index]) {
            this.keyMap[index] = []
        }else{
            for (let array of this.keyMap[index]){
                if(array[0]===key){
                    array[1] =value
                    return index
                }

            }
        }
        this.keyMap[index].push([key, value]);
        return index;
    }

    keys() {
        let hashKeys = [];
        for (let i = 0; i < this.keyMap.length; i++) {
            if (this.keyMap[i]) {
                for (let j = 0; j < this.keyMap[i].length; j++) {
                    if(!hashKeys.includes(this.keyMap[i][j][0])){
                         hashKeys.push(this.keyMap[i][j][0])
                    }
                   
                }
            }

        }
        return hashKeys
    }

    values() {
        let values = [];
        for (let i = 0; i < this.keyMap.length; i++) {
            if (this.keyMap[i]) {
                for (let j = 0; j < this.keyMap[i].length; j++) {
                     if(!values.includes(this.keyMap[i][j][1])){
                          values.push(this.keyMap[i][j][1])
                     }
                   
                }
            }

        }
        return values
    }

    get(key) {
        let index = this._hash(key);
        if (this.keyMap[index]) {
            for (let i = 0; i < this.keyMap[index].length; i++) {
                if (this.keyMap[index][i][0] === key) {
                    return this.keyMap[index][i][1]
                }

            }
        }
        return undefined;
    }
}

var ht = new HashTable();
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
