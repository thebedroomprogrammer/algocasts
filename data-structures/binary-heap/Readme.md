# **Binary Heap**

## Written in
* JavaScript
* Golang

## Resources
* [Geeks for geeks](https://www.geeksforgeeks.org/binary-heap/) 

```
                        87
                +----------------+
               72                70
          +---------+        +--------+ 
         55          58      47        42
       +---+       +---+   +---+     
      35   34     26   25 38   39   

ARRAY REPRESENTATION : [87,72,70,55,58,47,42,35,34,26,25,38,39] which is the LEVEL ORDER TRAVERSAL
```

## Operations
* Insert
* Delete Key
* Extract Max

## Time Complexity
* **_Insert_**: Inserting a new key takes **O(Logn)** time. We add a new key at the end of the tree. IF new key is greater than its parent, then we don’t need to do anything. Otherwise, we need to traverse up to fix the violated heap property.
* **_Extract Max_**: Time Complexity of this Operation is **O(Logn)**
* **_Delete_**: Deleting a key also takes **O(Logn)** time.

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

