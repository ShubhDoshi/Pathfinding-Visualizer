

export function bfs(grid, startNode, finishNode) {
    const visitedNodesInOrder = [startNode];
    const queue=[startNode];
    startNode.distance=0;
    startNode.isVisited=true;
    let ind=0;
    while(ind<queue.length){
        let cur=queue[ind];
        ind++;
        const unvisitedNeighbors = getUnvisitedNeighbors(cur, grid);
        for(let i=0;i<unvisitedNeighbors.length;i++){
            const {col, row} = unvisitedNeighbors[i];
            grid[row][col].previousNode=cur;
            if (grid[row][col] === finishNode) return visitedNodesInOrder;
            unvisitedNeighbors[i].distance=cur.distance+1;
            unvisitedNeighbors[i].isVisited=true;
            visitedNodesInOrder.push(unvisitedNeighbors[i]);
            queue.push(unvisitedNeighbors[i]);
        }
    }
}

function getUnvisitedNeighbors(node, grid) {
    const neighbors = [];
    const {col, row} = node;
    if (row > 0 && grid[row - 1][col].isWall===false && grid[row - 1][col].isVisited===false) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1 && grid[row + 1][col].isWall===false && grid[row + 1][col].isVisited===false) neighbors.push(grid[row + 1][col]);
    if (col > 0 && grid[row][col-1].isWall===false && grid[row][col-1].isVisited===false) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1 && grid[row][col+1].isWall===false && grid[row][col+1].isVisited===false) neighbors.push(grid[row][col + 1]);
    return neighbors;
  }

  


  export function getNodesInShortestPathOrderBFS(finishNode) {
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
      nodesInShortestPathOrder.unshift(currentNode);
      currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
  }

  