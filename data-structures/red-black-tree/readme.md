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

## Insertion
* 10,18,7,15,16,30,25,40,60,2,1,70
![1](https://i.ibb.co/MS57q5H/image.png)
![2](https://i.ibb.co/cT9DyL1/image.png)
![3](https://i.ibb.co/5kTGvT6/image.png)
![4](https://i.ibb.co/qndmWXs/image.png)
![5](https://i.ibb.co/9bvCTff/image.png)
![6](https://i.ibb.co/8Df5w0y/image.png)
![7](https://i.ibb.co/30QZJtp/image.png)
![8](https://i.ibb.co/rQJVTMJ/image.png)
![9](https://i.ibb.co/7tG1kQC/image.png)
![10](https://i.ibb.co/486pnzH/image.png)
![11](https://i.ibb.co/5WRCB0p/image.png)
![12](https://i.ibb.co/02x5zxV/image.png)
