var k = [3, 4, 5, 6, 7, 8, 9, 10, 14, 15, 17];

function jumpSearch(arr, value) {
    let len = arr.length
    let step = Math.floor(Math.sqrt(len))

    let prev = 0;
    while (arr[Math.min(step, len) - 1] < value) {
        prev = step;
        step += Math.floor(Math.sqrt(len));
        if (prev >= len)
            return -1;
    }

    for (let i = prev; i < step; i++) {
        if (arr[i] === value) {
            return i;
        }
    }

    return -1;

}

jumpSearch(k, 14)
