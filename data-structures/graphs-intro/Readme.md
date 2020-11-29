# **Graphs**
A Graph consists of a finite set of vertices(or nodes) and set of Edges which connect a pair of nodes.

## Written in
* JavaScript
* Golang

## Resources
* [Geeks for geeks](https://www.geeksforgeeks.org/graph-data-structure-and-algorithms/) 
* [MyCodeSchool](https://www.youtube.com/watch?v=gXgEDyodOJU)

![image](https://www.geeksforgeeks.org/wp-content/uploads/undirectedgraph.png)

## Operations
* Add Vertex
* Add Edge
* Remove Vertex
* Remove Edge

## Time Complexity
![Time complexity graph](https://i.imgur.com/ZMKh4Au.png)
* For Edge List Time complexity to find adjacent node would be O(|E|)
* For Edge List Time complexity to check if nodes are connected would be O(|E|)
* Both the above complexities are not that great since they can grow exponentially as |E| >= |V|*|V| and we want it under |V|. Hence Adjacency matrix.
* For Adjacency Matrix Time complexity to find adjacent node would be O(|V|)
* For Adjacency Matrix Time complexity to check if nodes are connected would be O(1) + O(|V|) Can use Hash Table to avoid O(|V|) so it would be O(1).
* For Adjacency List Time complexity to find adjacent node would be O(|V|)
* For Adjacency List Time complexity to check if nodes are connected would be O(V). O(log|V|) is rows are stored using BST. 

## Notes
* Max number of edges if there are no self loops or multi-edges for a directed graph would be n(n-1) where n is number of nodes.
* Max number of edges if there are no self loops or multi-edges for a undirected graph would be n(n-1)/2
* A graph can be Dense and Sparse. Dense graphs are stored in Adjacency Matrix where as sparse graphs are stored in Adjacency list.
* Path is where no vertices or edges are repeated.
* Walk is where repetion is allowed. Length of a walk must be greater than 0(edges)
* Closed walk starts and ends at same vertex. 
* Simple cycle is no repetion of vertex other than start and end.
* An Acyclic graph is a graph with no cycle. Tree is an Undirected Acyclic graph.
* Trail is a walk where no edges are repeated.
* Any graph that has path from any vertex to any other vertex is a strogly connected graph
* Representation G = (V,E)

![Graph Terms](https://i.imgur.com/G7NVbK3.png)
![Undirected Graph](https://i.imgur.com/PG63x9W.png)
![Directed Graph](https://i.imgur.com/oELwX8H.png)
![Weighted Graph](https://i.imgur.com/pFNPMm5.png)
![Adjacency Matrix](https://i.imgur.com/XLT01qj.png)
![Adjacency List](https://i.imgur.com/U1zCo9C.png)
![Adjacency List](https://i.imgur.com/TjAp5OO.png)
![Comparison](https://i.imgur.com/WVerQ1F.png)

