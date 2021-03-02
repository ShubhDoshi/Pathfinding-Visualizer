export function dfs(grid, startNode,finishNode){
    startNode.distance=0;
    startNode.isVisited=true;
    const visitedNodesInOrder=[startNode];
    const stack=[startNode];
    let ind=1;
    while (ind!==0){
        let cur=stack.pop();
        ind--;
        const neighbors=getNeighbors(cur,grid);
        for(let i=0;i<neighbors.length;i++){
            if(cur.distance+1<neighbors[i].distance && neighbors[i].isVisited===false){
                neighbors[i].isVisited=true;
                neighbors[i].distance=cur.distance+1;
                neighbors[i].previousNode=cur;
                stack.push(neighbors[i]);
                ind++;
                visitedNodesInOrder.push(neighbors[i]);
                if(neighbors[i]===finishNode){
                    return visitedNodesInOrder;
                }
            }
        }
    }
    return visitedNodesInOrder;
}

function getNeighbors(node, grid) {
    const neighbors = [];
    const {col, row} = node;
    if (row > 0 && grid[row - 1][col].isWall===false) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1 && grid[row + 1][col].isWall===false) neighbors.push(grid[row + 1][col]);
    if (col > 0 && grid[row][col-1].isWall===false) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1 && grid[row][col+1].isWall===false) neighbors.push(grid[row][col + 1]);
    return neighbors;
  }

  export function getNodesInShortestPathOrderDFS(finishNode) {
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
      nodesInShortestPathOrder.unshift(currentNode);
      currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
  }
