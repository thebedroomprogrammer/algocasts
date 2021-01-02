class FenwickTree {
    

    getSum(position) {
       let sum =  0;
       position += 1
       
       while (position > 0 ) {
           sum += this.indexedArray[position] 
           position -= position & (-position)
       }
       return sum
   }

   setValue(position, element) {
       position += 1

       while (position < this.indexedArray.length) {
           this.indexedArray[position] += element
           position += position & (-position)
       }
   }

   constructor(arr) {
       this.indexedArray = Array(arr.length + 1).fill(0)

       for (let i = 0; i < arr.length; i++) {
           this.setValue(i, arr[i])
       }

   }

}

var a = [3, 2, -1, 5, 6, 4, -2, 3, 7, 2, 3];

var ft = new FenwickTree(a);
