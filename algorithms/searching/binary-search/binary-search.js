var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

function binarySearch(arr, value) {
    let left = 0;
    let right = arr.length - 1;
    let middle = Math.floor((right + left) / 2);
    while (left <= right && arr[middle] !== value) {
        if (value < arr[middle]) {
            right = middle - 1;
        } else {
            left = middle + 1;
        }

        middle = Math.floor((right + left) / 2);
    }

    if (arr[middle] === value) {
        return middle;
    }

    return -1;
}

console.log(binarySearch(arr, 9));
