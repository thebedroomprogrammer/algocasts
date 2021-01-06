var a = [33, 1123, 3, 45, 4, 54, 52, 12, 3132, 12315, 5, 565]

function getDigit(num, place) {
    return Math.floor(Math.abs(num) / Math.pow(10, place)) % 10
}

function digitCount(num) {
    if (num === 0) {
        return 1
    }
    return Math.log(num) * Math.LOG10E + 1 | 0
}

function mostDigits(nums) {
    let maxDigit = 0;

    for (let num of nums) {
        const digit = digitCount(num);
        if (digit > maxDigit) {
            maxDigit = digit
        }
    }
    return maxDigit;
}

function radixSort(a) {
    const loopFor = mostDigits(a);

    for (let i = 0; i < loopFor; i++) {
        let digitBucket = Array.from({
            length: 10
        }, ()=>[])
        for (let j = 0; j < a.length; j++) {
            const digit = getDigit(a[j], i);
            digitBucket[digit].push(a[j])

        }
        a = [].concat(...digitBucket)
    }
    return a

}

radixSort(a)
