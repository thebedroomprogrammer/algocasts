var arr = [1, 2, 3, 4, 5, 6, 67, 8];

function linearSearch(a, value) {
    for (let i = 0; i < a.length; i++) {
        if (a[i] === value) {
            return i;
        }
    }

    return -1;
}

console.log(linearSearch(arr, 1));
