#Example
![graph](https://i.imgur.com/tStb4Vu.png)

Approach
1. Everytime we look to visit a new node we pick the node with the smallest known distance to visit
2. Once we have moved to the node we are going to visit, we look at each of it's neightbors.
3. For each neightboring node, we calcularte the distance by summing the total edges,
that lead to the node we are checking from the starting node
4.  If the new total distance to a node is less that the previous total we srore the new shorter distance for that node.