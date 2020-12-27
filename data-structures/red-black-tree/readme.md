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


### Insertion Rules 
* If tree is empty create a new node and color it black
* If tree is not empty create a new node and color it red
* If parent of new node is black then exit
* If parent of new node is red, then check the color of parent's sibling.
    * If color of sibling is black or null then do suitable rotation and recolor
    * If color of sibling is red then recolor and also check if parent's parent is not root node if not, then recolor it as well and recheck above.
### Deletetion Rules 
* [Best Explaination](https://www.geeksforgeeks.org/red-black-tree-set-3-delete-2/)
* Important point: Only a node with no children is deleted. 
1) Case 1: Node to be deleted is red
    a) Go ahead and delete the node.
2) Case 2: If sibling of the deleted node is black and it's children are black.
    a) Make sibling black
    b) If parent is red make it black
    c) if parent is black then go up a state and perform same steps on parent's sibling.
3) Case 3: If sibling of the deleted node is black and at least one children is red.
    a) 
4) Case 4: If sibling is red
    a) Swap parent and sibling color
    b) Perform apt rotation
    c) Reapply cases

