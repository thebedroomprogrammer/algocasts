package main

import (
	"fmt"
	"math"
)

func main() {
	a := []float64{33, 1123, 3, 45, 4, 54, 52, 12, 3132, 12315, 5, 565}
	fmt.Println(radixSort(a))
}

func getDigit(num float64, place float64) float64 {
	return float64(int(math.Floor(math.Abs(num)/math.Pow(10, place))) % 10)
}

func digitCount(num float64) float64 {
	if num == 0 {
		return 1
	}
	return math.Floor(math.Log10(math.Abs(num))) + 1
}

func mostDigits(nums []float64) float64 {
	var maxDigit float64 = 0

	for _, num := range nums {
		digit := digitCount(num)
		if digit > maxDigit {
			maxDigit = digit
		}
	}
	return maxDigit
}

func radixSort(a []float64) []float64 {
	loopFor := mostDigits(a)

	for i := 0; i < int(loopFor); i++ {
		var digitBucket [10][]float64
		for j := 0; j < len(a); j++ {
			digit := int(getDigit(a[j], float64(i)))
			digitBucket[digit] = append(digitBucket[digit], a[j])

		}

		res := []float64{}
		for p := 0; p < len(digitBucket); p++ {
			for q := 0; q < len(digitBucket[p]); q++ {
				res = append(res, digitBucket[p][q])
			}

		}
		a = res
	}
	return a
}
