# **Binary Search Tree**

## Resources:
* [Geeks for geeks](https://www.geeksforgeeks.org/binary-tree-data-structure/) 
* [Mycodeschool](https://www.youtube.com/watch?v=H5JubkIy_p8&list=PL2_aWCzGMAwI3W_JlcBbtYTwiQSsOTa6P&index=26) 

```
                    30
                   /  \
                  /    \
                 /      \
                10      40
               /  \    /  \
              /   \   /   \
             5   15   35   45
           / \  / \  /  \  / \
          1  6 14 16 31 36 42 50

LEVEL ORDER TRAVERSAL - 30,10,40,5,15,35,45,1,6,14,16,31,36,42,50
PREORDER TRAVERSAL - 30,10,5,1,6,15,14,16,40,35,31,36,45,42,50
INORDER TRAVERSAL - 1,5,6,10,14,15,16,30,31,35,36,40,42,45,50
POSTORDER TRAVERSAL - 1,6,5,14,16,15,10,31,36,35,42,50,45,40,30
```

## Operations
* isBst 
* height
* min
* max
* find
* search
* delete
* insert
* levelOrderTraversal
* inOrderTraversal
* preOrderTraversal
* postOrderTraversal
* inOrderSuccessor

## Time Complexity

* _Searching_: For searching element 1, we have to traverse all elements (in order 3, 2, 1). Therefore, searching in binary search tree has worst case complexity of **O(n)**. In general, time complexity is **O(h)** where h is height of BST.
* **_Insertion_**: For inserting element 0, it must be inserted as left child of 1. Therefore, we need to traverse all elements (in order 3, 2, 1) to insert 0 which has worst case complexity of **O(n)**. In general, time complexity is **O(h)**.
* **_Deletion_**: For deletion of element 1, we have to traverse all elements to find 1 (in order 3, 2, 1). Therefore, deletion in binary tree has worst case complexity of **O(n)**. In general, time complexity is **O(h)**.
