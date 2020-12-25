# **Red Black Tree**

## Written in
* JavaScript
* Golang

## Resources
* [Geeks for geeks](https://www.geeksforgeeks.org/red-black-tree-set-1-introduction-2/) 
* [Jenny's Lecture](https://www.youtube.com/watch?v=3RQtq7PDHog&t=2s) 



## Operations
* Insertion 
* Deletion


## Time Complexity
* **_Searching_**: O(log n)
* **_Insertion_**: O(log n)
* **_Deletion_**: O(log n)

## Notes
* Refer Geeks for Geeks
* Insertion Simplified 
    * If tree is empty create a new node and color it black
    * If tree is not empty create a new node and color it red
    * If parent of new node is black then exit
    * If parent of new node is red, then check the color of parent's sibling.
        * If color of sibling is black or null then do suitable rotation and recolor
        * If color of sibling is red then recolor and also check if parent's parent is not root node if not, then recolor it as well and recheck above.


