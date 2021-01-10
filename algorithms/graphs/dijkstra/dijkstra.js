
class Graph {

    constructor() {
        this.adjacencyList = {}
    }

    addVertex(name) {
        if (!this.adjacencyList[name])
            return this.adjacencyList[name] = []
    }

    addEdge(v1, v2, weight) {
        this.adjacencyList[v1].push({
            node: v2,
            weight
        });
        this.adjacencyList[v2].push({
            node: v1,
            weight
        });
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

    dijkstra(start, end) {
        console.log("finding from", start, end);
        const nodes = new PriorityQueue();
        const distances = {};
        const previous = {};
        let path = [];
        for (let vertex in this.adjacencyList) {
            if (vertex === start) {
                distances[vertex] = 0
                nodes.enqueue(vertex, 0)
            } else {
                distances[vertex] = Infinity;
                nodes.enqueue(vertex, Infinity)

            }
            previous[vertex] = null
        }
        while (nodes.values.length) {
        console.log(nodes.values.map((a)=>a.value))
            
            var node = nodes.dequeue().value;
            if (node === end) {
                while (previous[node]) {
                    path.push(node);
                    node = previous[node];
                }
                break
            }

            if (node || distances[node] !== Infinity) {
                for (let vertex in this.adjacencyList[node]) {
                   
                    const neighbour = this.adjacencyList[node][vertex];
                   
                    //calculate and update distances
                    const newDistance = distances[node] + neighbour.weight;
                    if (newDistance < distances[neighbour.node]) {
                        distances[neighbour.node] = newDistance;
                        previous[neighbour.node] = node;
                        nodes.enqueue(neighbour.node, newDistance);
                    }

                }
            }

        }
       return path.concat(node).reverse()

    }
}

class PriorityQueue {
    constructor() {
        this.values = []
    }

    enqueue(value,priority) {
        var node = new Node(value,priority)
        this.values.push(node)
        this.bubbleUp()

    }

    bubbleUp() {
        var idx = this.values.length - 1;
        var element = this.values[idx];

        while (idx > 0) {
            var parentIdx = Math.floor((idx - 1) / 2);
            var parent = this.values[parentIdx];
            if (element.priority >= parent.priority)
                break;

            this.values[parentIdx] = element;
            this.values[idx] = parent;
            idx = parentIdx;

        }

    }

    dequeue() {
        var root = this.values[0];
        var end = this.values.pop();
        if (this.values.length > 0) {
            this.values[0] = end;
            this.bubbleDown()
        }

        return root;

    }

    bubbleDown() {
        var parent = this.values[0]
        var parentIdx = 0;
        while (true) {
            var leftIdx = (2 * parentIdx) + 1;
            var rightIdx = (2 * parentIdx) + 2;
            var leftChild, rightChild, swapIdx = null;

            if (leftIdx < this.values.length) {
                leftChild = this.values[leftIdx];
                if (leftChild.priority < parent.priority) {
                    swapIdx = leftIdx;
                }
            }
            if (rightIdx < this.values.length) {
                rightChild = this.values[rightIdx];
                if ((swapIdx === null && rightChild.priority < parent.priority) || (swapIdx !== null && rightChild.priority < leftChild.priority)) {
                    swapIdx = rightIdx
                }
            }

            if (swapIdx === null) {
                break
            }

            this.values[parentIdx] = this.values[swapIdx];
            this.values[swapIdx] = parent;
            parentIdx = swapIdx;
        }
    }

}

class Node{
    constructor(value,priority){
        this.value = value;
        this.priority = priority;
    }
}


var g = new Graph()


g.addVertex("A");
g.addVertex("B");
g.addVertex("C");
g.addVertex("D");
g.addVertex("E");
g.addVertex("F");

g.addEdge("A", "B", 4);
g.addEdge("A", "C", 2);
g.addEdge("B", "E", 3);
g.addEdge("C", "D", 2);
g.addEdge("C", "F", 4);
g.addEdge("D", "F", 1);
g.addEdge("D", "E", 3);
g.addEdge("E", "F", 1);

g.dijkstra("A", "E")

// console.log(g.adjacencyList["A"]);
