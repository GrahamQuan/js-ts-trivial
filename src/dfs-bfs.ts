class Graph {
  private adjacencyList: Map<number, number[]>;

  constructor() {
    this.adjacencyList = new Map();
  }

  addVertex(vertex: number): void {
    if (!this.adjacencyList.has(vertex)) {
      this.adjacencyList.set(vertex, []);
    }
  }

  addEdge(vertex1: number, vertex2: number): void {
    this.adjacencyList.get(vertex1)?.push(vertex2);
    this.adjacencyList.get(vertex2)?.push(vertex1);
  }

  dfs(startVertex: number): void {
    const visited: Set<number> = new Set();
    this.dfsHelper(startVertex, visited);
  }

  private dfsHelper(vertex: number, visited: Set<number>): void {
    console.log(vertex);
    visited.add(vertex);

    const neighbors = this.adjacencyList.get(vertex) || [];
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        this.dfsHelper(neighbor, visited);
      }
    }
  }

  bfs(startVertex: number): void {
    const visited: Set<number> = new Set();
    const queue: number[] = [];

    visited.add(startVertex);
    queue.push(startVertex);

    while (queue.length > 0) {
      const currentVertex = queue.shift()!;
      console.log(currentVertex);

      const neighbors = this.adjacencyList.get(currentVertex) || [];
      for (const neighbor of neighbors) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      }
    }
  }
}

// 示例用法
const graph = new Graph();
graph.addVertex(1);
graph.addVertex(2);
graph.addVertex(3);
graph.addVertex(4);
graph.addVertex(5);

graph.addEdge(1, 2);
graph.addEdge(1, 3);
graph.addEdge(2, 4);
graph.addEdge(2, 5);

console.log('DFS:');
graph.dfs(1);

console.log('BFS:');
graph.bfs(1);
