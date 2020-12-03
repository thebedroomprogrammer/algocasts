/*
   /----A--- \
   B         C
   |         |
   D---------E
    \___F___/
*/
package main

import "fmt"

type Vertex struct {
	value interface{}
}

func filter(slice []*Vertex, v *Vertex) []*Vertex {
	var filteredSlice []*Vertex
	for i := range slice {
		if slice[i] != v {
			filteredSlice = append(filteredSlice, slice[i])
		}
	}
	return filteredSlice
}

type Graph struct {
	adjacencyList map[*Vertex][]*Vertex
}

func (g *Graph) addVertex(v *Vertex) {
	if g.adjacencyList == nil {
		g.adjacencyList = make(map[*Vertex][]*Vertex)
	}
	g.adjacencyList[v] = []*Vertex{}
}

func (g *Graph) addEdge(v1 *Vertex, v2 *Vertex) {
	g.adjacencyList[v1] = append(g.adjacencyList[v1], v2)
	g.adjacencyList[v2] = append(g.adjacencyList[v2], v1)
}

func (g *Graph) removeVertex(v *Vertex) {
	for len(g.adjacencyList[v]) != 0 {
		poppedVertex := g.adjacencyList[v][len(g.adjacencyList[v])-1]
		g.adjacencyList[v] = g.adjacencyList[v][:len(g.adjacencyList[v])-1]
		g.removeEdge(v, poppedVertex)
	}

	delete(g.adjacencyList, v)

}

func (g *Graph) removeEdge(v1 *Vertex, v2 *Vertex) {
	g.adjacencyList[v1] = filter(g.adjacencyList[v1], v2)
	g.adjacencyList[v2] = filter(g.adjacencyList[v2], v1)

}

func (g *Graph) depthFirstRecursive(vertex *Vertex) []Vertex {
	var result []Vertex
	visited := map[*Vertex]bool{}
	var dfs func(v *Vertex)
	dfs = func(v *Vertex) {
		if v == nil {
			return
		}
		result = append(result, *v)
		visited[v] = true
		for _, neighbour := range g.adjacencyList[v] {
			if !visited[neighbour] {
				dfs(neighbour)
			}
		}

	}

	dfs(vertex)
	return result
}

func (g *Graph) breadthFirst(vertex *Vertex) []Vertex {
	var result []Vertex
	visited := map[*Vertex]bool{}
	queue := []*Vertex{vertex}
	visited[vertex] = true
	for len(queue) > 0 {
		dequedVertex := queue[0]
		result = append(result, *dequedVertex)
		queue = queue[1:]
		for _, neighbour := range g.adjacencyList[dequedVertex] {

			if !visited[neighbour] {
				visited[neighbour] = true
				queue = append(queue, neighbour)
			}
		}
	}
	return result
}

func (g *Graph) depthFirstIterative(vertex *Vertex) []Vertex {
	var result []Vertex
	visited := map[*Vertex]bool{}
	stack := []*Vertex{vertex}
	visited[vertex] = true
	for len(stack) > 0 {
		poppedVertex := stack[len(stack)-1]
		result = append(result, *poppedVertex)
		stack = stack[:len(stack)-1]
		for _, neighbour := range g.adjacencyList[poppedVertex] {

			if !visited[neighbour] {
				visited[neighbour] = true
				stack = append(stack, neighbour)
			}
		}
	}

	return result
}

func main() {
	vA := Vertex{"A"}
	vB := Vertex{"B"}
	vC := Vertex{"C"}
	vD := Vertex{"D"}
	vE := Vertex{"E"}
	vF := Vertex{"F"}

	g := Graph{}
	g.addVertex(&vA)
	g.addVertex(&vB)
	g.addVertex(&vC)
	g.addVertex(&vD)
	g.addVertex(&vE)
	g.addVertex(&vF)
	g.addEdge(&vA, &vB)
	g.addEdge(&vA, &vC)
	g.addEdge(&vB, &vD)
	g.addEdge(&vC, &vE)
	g.addEdge(&vD, &vE)
	g.addEdge(&vD, &vF)
	g.addEdge(&vE, &vF)
	fmt.Println(g.breadthFirst(&vA))
}
