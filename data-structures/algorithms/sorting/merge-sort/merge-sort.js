

var a = [22,11,231,101,222,412,99,87,66]

function mergeSort(a) {
    console.log(a)
    const length = a.length;
    if(length <= 1){
        return a
    }
    const a1 = a.slice(0, length / 2)
    const a2 = a.slice(length / 2)
    
   return merge(mergeSort(a1), mergeSort(a2))

}

function merge(a, b) {
    let result = [];
    let i = 0;
    let j = 0;

    while (i < a.length && j < b.length) {

        if (a[i] < b[j]) {
            result.push(a[i])
            i++
        } else {
            result.push(b[j])
            j++
        }
    }

    if (i < a.length) {
        result = [...result, ...a.slice(i)]
    }
    if (j < b.length) {
        result = [...result, ...b.slice(j)]

    }
    return result;
}

mergeSort(a)
