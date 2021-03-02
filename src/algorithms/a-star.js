export function aStar(grid,startNode,finishNode){
    const open=[startNode];
    let x=1;
    const close=[];
    const h=[];
    const f=[];
    const visitedNodesInOrder=[startNode];
    const {col, row} = finishNode;
    for (let row1=0;row1<23;row1++){
        let temp1=[];
        let temp2=[];
        for(let col1=0;col1<57;col1++){
            temp1.push(Math.abs(row-row1)+Math.abs(col-col1));
            temp2.push(grid[row1][col1].distance+Math.abs(row-row1)+Math.abs(col-col1));
        }
        h.push(temp1);
        f.push(temp2);
    }
    f[startNode.row][startNode.col]=0;
    startNode.distance=0;
    startNode.isVisited=true;
    while(x>0){
        let ind=0;
        const {col, row} = open[ind];
        let val=f[row][col];
        for(let i=0;i<open.length;i++){
            const {col, row} = open[i];
            if (val>f[row][col]){
                val=f[row][col];
                ind=i;
            }
        }
        let q=open[ind];
        open.splice(ind,1);
        x--;
        const neighbors=getUnvisitedNeighbors(q,grid);
        for (let i=0;i<neighbors.length;i++){
            if(neighbors[i]===finishNode){
                neighbors[i].previousNode=q;
                visitedNodesInOrder.push(neighbors[i]);
                neighbors.isVisited=true;
                const {col, row} =neighbors[i];
                neighbors[i].distance=q.distance+1;
                f[row][col]=neighbors[i].distance+h[row][col];
                return visitedNodesInOrder;
            }
            let temp1=false;
            let temp2=false;
            for (let j=0;j<close.length;j++){
                if(close[j]===neighbors[i]){
                    temp2=true;
                }
            }
            for (let j=0;j<open.length;j++){
                if(open[j]===neighbors[i]){
                    temp1=true;
                }
            }
            if(temp2===true){
                continue;
            }
            else if(temp1===true && neighbors[i].distance>q.distance+1){
                neighbors[i].distance=q.distance+1;
                neighbors[i].previousNode=q;
                const {col, row} =neighbors[i];
                f[row][col]=neighbors[i].distance+h[row][col];
            }
            else if(temp1===false && temp2===false){
                neighbors[i].previousNode=q;
                visitedNodesInOrder.push(neighbors[i]);
                neighbors.isVisited=true;
                const {col, row} =neighbors[i];
                neighbors[i].distance=q.distance+1;
                f[row][col]=neighbors[i].distance+h[row][col];
                open.push(neighbors[i]);
                x++;
            }
        }
        close.push(q);
    }
}

function getUnvisitedNeighbors(node, grid) {
    const neighbors = [];
    const {col, row} = node;
    if (row > 0 && grid[row - 1][col].isWall===false) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1 && grid[row + 1][col].isWall===false) neighbors.push(grid[row + 1][col]);
    if (col > 0 && grid[row][col-1].isWall===false) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1 && grid[row][col+1].isWall===false) neighbors.push(grid[row][col + 1]);
    return neighbors;
  }


//to get the nodes in the shortest path
export function getNodesInShortestPathOrderAStar(finishNode) {
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
      nodesInShortestPathOrder.unshift(currentNode);
      currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
  }