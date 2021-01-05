var arr = [3, 4, 5, 1, 3, 5, 6, 6, 78];

function selectionSort(arr) {
    for (let i = 0; i < arr.length; i++) {
        let min = i;
        for (let j = i + 1; j < arr.length; j++) {

            if (arr[j] < arr[min]) {
                min = j

            }
        }

        if (min !== i) {
            var temp = arr[i];
            arr[i] = arr[min];
            arr[min] = temp

        }

    }
    return arr
}

selectionSort(arr)
