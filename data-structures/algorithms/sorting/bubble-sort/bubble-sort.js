var arr = [3, 4, 5, 1, 3, 5, 6, 6, 78];

function bubbleSort(arr) {
    for (let i = arr.length; i > 0; i--) {
        let hasSwapped = false;
        for (let j = 0; j < i - 1; j++) {
            console.log("run")
            if (arr[j + 1] < arr[j]) {
                hasSwapped = true;

                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp
            }
        }
        if (!hasSwapped) {
            break
        }
    }
    return arr
}

bubbleSort(arr)
