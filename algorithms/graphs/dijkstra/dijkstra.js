/*
    /----A--- \ 
    B         C
    |         |
    D---------E
     \___F___/
*/

class Graph {

    constructor() {
        this.adjacencyList = {}
    }

    addVertex(name) {
        if (!this.adjacencyList[name])
            return this.adjacencyList[name] = []
    }

    addEdge(v1, v2, weight) {
        this.adjacencyList[v1].push({node:v2,weight});
        this.adjacencyList[v2].push({node:v1,weight});
    }
    removeEdge(v1, v2) {
        this.adjacencyList[v1] = this.adjacencyList[v1].filter((v)=>v !== v2)
        this.adjacencyList[v2] = this.adjacencyList[v2].filter((v)=>v !== v1)

    }
    removeVertex(name) {

        while (this.adjacencyList[name].length) {

            let vertex = this.adjacencyList[name].pop()
            this.removeEdge(name, vertex)

        }

        delete this.adjacencyList[name]
    }

    depthFirsRecursive(vertex) {
        const result = [];
        const visited = {};
        const dfs = (vertex)=>{
            if (!vertex) {
                return null
            }
            result.push(vertex);
            visited[vertex] = true;

            this.adjacencyList[vertex].forEach(neighbour=>{
                if (!visited[neighbour]) {
                    return dfs(neighbour)
                }
            }
            )
        }

        dfs(vertex);
        return result;

    }
    depthFirstIterative(vertex) {
        const result = [];
        const visited = {};
        let stack = [vertex];
        visited[vertex] = true

        while (stack.length !== 0) {
            console.log(stack)
            const poppedVertex = stack.pop();
            result.push(poppedVertex);

            this.adjacencyList[poppedVertex].forEach((v)=>{
                if (!visited[v]) {
                    visited[v] = true;
                    stack.push(v);
                }
            }
            )

        }
        return result;

    }
    breadthFirst(vertex) {
        const result = [];
        const visited = {};
        let queue = [vertex];
        visited[vertex] = true

        while (queue.length !== 0) {

            const poppedVertex = queue.shift();
            result.push(poppedVertex);
            this.adjacencyList[poppedVertex].forEach((v)=>{
                if (!visited[v]) {
                    visited[v] = true;
                    queue.push(v);
                }
            }
            )

        }
        return result;

    }
}

var g = new Graph()
g.addVertex("A");
g.addVertex("B");
g.addVertex("C");
g.addVertex("D");
g.addVertex("E");
g.addVertex("F");

g.addEdge("A", "B",1);
g.addEdge("A", "C",33);
g.addEdge("B", "D",1);
g.addEdge("C", "E",44);
g.addEdge("D", "E",5);
g.addEdge("D", "F",5);
g.addEdge("E", "F",6);

console.log(g.adjacencyList["A"]);
