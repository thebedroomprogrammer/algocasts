var a = [33,1123,3,45,4,54,52,12,3132,12315,5,565]

function swap(a, i, j) {
    let temp = a[i];
    a[i] = a[j]
    a[j] = temp;
}

function pivot(a, start) {
    const pivotElement = a[start];
    let pivotIdx = start;

    for (let i = start; i < a.length; i++) {
        if (pivotElement > a[i]) {
            pivotIdx++;
            swap(a, pivotIdx, i)
        }
    }
    swap(a, start, pivotIdx)
    return pivotIdx

}

function quickSort(a, start=0, end=a.length - 1) {
    if (start < end) {
        const pivotIdx = pivot(a, start, end);
        quickSort(a, start, pivotIdx - 1);
        quickSort(a, pivotIdx + 1, end);
    }
    return a

}

quickSort(a)
