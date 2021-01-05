var arr = [3, 4, 5, 1, 3, 5, 6, 6, 78];

function insertionSort(a) {
    for (let i = 1; i < a.length; i++) {
        const val = a[i]
        for (var j = i - 1; j >= 0 && a[j] > val; j--) {

            a[j + 1] = a[j]
        }
        a[j + 1] = val
    }
    return a
}

insertionSort(arr)
