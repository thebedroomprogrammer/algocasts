# **Binary Heap**

## Written in
* JavaScript
* Golang

## Resources
* [Geeks for geeks](https://www.geeksforgeeks.org/binary-heap/) 

```
                        100
                +----------------+
               80                90
          +---------+        +--------+ 
         40          50      60        70
       +---+       +---+   +---+     +---+
      35   30     25   20 15   10   5    0

ARRAY REPRESENTATION : [100,80,9040,50,60,70,35,30,25,20,15,10,5,0] which is the LEVEL ORDER TRAVERSAL
```

## Operations


## Time Complexity


## Notes
* Similar to bst but has different rules.
* In MaxBinaryHeap parent nodes are larger than child nodes.
* In MinBinaryHeap parent nodes are smaller than child nodes.
* It’s a complete tree (All levels are completely filled except possibly the last level and the last level has all keys as left as possible). This property of Binary Heap makes them suitable to be stored in an array.
* A Binary Heap is a Complete Binary Tree. A binary heap is typically represented as an array.
* The root element will be at Arr[0].
* Below table shows indexes of other nodes for the ith node, i.e., Arr[i]:

| Index        | Description                  |
| ------------ | ---------------------------- |
| Arr[(i-1)/2] | Returns the parent node      |
| Arr[(2*i)+1] | Returns the left child node  |
| Arr[(2*i)+2] | Returns the right child node |

