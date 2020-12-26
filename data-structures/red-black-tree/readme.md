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
* Every single node in the tree must be either red or black.
* The root node of the tree must always be black.
* Two red nodes can never appear consecutively, one after another; a red node must always be preceded by a black node (it must have a black parent node), and a red   node must always have black children nodes.
*Every branch path — the path from a root node to an empty (null) leaf node — must pass through the exact same number of black nodes. A branch path from the root to an empty leaf node is also known as an unsuccessful search path, since it represents the path we would take if we were to search for a node that didn’t exist within the tree.
* Refer Geeks for Geeks
* Insertion Simplified 
    * If tree is empty create a new node and color it black
    * If tree is not empty create a new node and color it red
    * If parent of new node is black then exit
    * If parent of new node is red, then check the color of parent's sibling.
        * If color of sibling is black or null then do suitable rotation and recolor
        * If color of sibling is red then recolor and also check if parent's parent is not root node if not, then recolor it as well and recheck above.


