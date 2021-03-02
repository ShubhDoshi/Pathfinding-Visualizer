export function greedy(grid,startNode,finishNode){
    const stack=[startNode];
    let x=1;
    const h=[];
    const visitedNodesInOrder=[];
    const {col, row} = finishNode;
    for (let row1=0;row1<23;row1++){
        let temp1=[];
        for(let col1=0;col1<57;col1++){
            temp1.push(Math.abs(row-row1)+Math.abs(col-col1));
        }
        h.push(temp1);
    }
    startNode.isVisited=true;
    while(x>0){
        let cur=stack.pop();
        visitedNodesInOrder.push(cur);
        if(cur===finishNode){
            return visitedNodesInOrder;
        }
        x--;
        let neighbors=getUnvisitedNeighbors(cur,grid);
        while(neighbors.length>0){
            let ind=0;
            let max=neighbors[ind];
            for(let i=0;i<neighbors.length;i++){
                if(max<h[neighbors[i].row][neighbors[i].col]){
                    max=h[neighbors[i].row][neighbors[i].col];
                    ind=i;
                }
            }
            neighbors[ind].previousNode=cur;
            neighbors[ind].isVisited=true;
            stack.push(neighbors[ind]);
            x++;
            neighbors.splice(ind,1);
        }
    }
    return visitedNodesInOrder;
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


//to get the nodes in the shortest path
export function getNodesInShortestPathOrderGreedy(finishNode) {
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
      nodesInShortestPathOrder.unshift(currentNode);
      currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
  }