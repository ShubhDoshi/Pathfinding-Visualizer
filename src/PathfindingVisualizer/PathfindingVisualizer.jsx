import React, {Component} from 'react';
import Node from './Node/Node';
import {dijkstra, getNodesInShortestPathOrder} from '../algorithms/dijkstra';
//import {bfs} from '../algorithms/bfs';
import Dropdown from 'react-bootstrap/Dropdown'
import { faSquareFull } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './PathfindingVisualizer.css';

let START_NODE_ROW =12;
let START_NODE_COL = 15;
let FINISH_NODE_ROW = 12;
let FINISH_NODE_COL = 43;
alert("(Note: Incase of any problem with the grid relative to screen size, the browser zoom settings should be adjusted accordingly.)");

/*
const START_NODE_ROW = prompt("Please enter start-node row", 12);
const START_NODE_COL = prompt("Please enter start-node column", 14);
const FINISH_NODE_ROW = prompt("Please enter target-node row", 12);
const FINISH_NODE_COL = prompt("Please enter target-node column", 42);
*/

export default class PathfindingVisualizer extends Component {
  constructor() {
    super();
    this.state = {
      grid: [],
      mouseIsPressed: false,
    };
  }

  componentDidMount() {
    const grid = getInitialGrid();
    this.setState({grid});
  }

  handleMouseDown(row, col) {
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({grid: newGrid, mouseIsPressed: true});
  }

  handleMouseEnter(row, col) {
    if (!this.state.mouseIsPressed) return;
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({grid: newGrid});
  }

  handleMouseUp() {
    this.setState({mouseIsPressed: false});
  }
  
  
  //function to give animation while implementing dijkstra with slow speed
  animateDijkstraSlow(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 1; i <= visitedNodesInOrder.length-1; i++) {
      if (i === visitedNodesInOrder.length-1) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 500 * i);
        return;
      }
      else{
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-visited';
      }, 500* i);
    }
    }
  }

  //function to give animation while implementing dijkstra with medium speed
  animateDijkstraMedium(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 1; i <= visitedNodesInOrder.length-1; i++) {
      if (i === visitedNodesInOrder.length-1) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 75 * i);
        return;
      }
      else{
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-visited';
      }, 75* i);
    }
    }
  }

  //function to give animation while implementing dijkstra with fast speed
  animateDijkstraFast(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 1; i <= visitedNodesInOrder.length-1; i++) {
      if (i === visitedNodesInOrder.length-1) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      else{
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-visited';
      }, 10* i);
    }
    }
  }

  //function to give animation to shortest path after implementing dijkstra  
  animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 1; i < nodesInShortestPathOrder.length-1; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-shortest-path';
      }, 50 * i);
    }
  }

  //implement dijkstra for finding shortest path for fast speed
  visualizeDijkstraFast() {
    const {grid} = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animateDijkstraFast(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  //implement dijkstra for finding shortest path for medium speed
  visualizeDijkstraMedium() {
    const {grid} = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animateDijkstraMedium(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  //implement dijkstra for finding shortest path for slow speed
  visualizeDijkstraSlow() {
    const {grid} = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animateDijkstraSlow(visitedNodesInOrder, nodesInShortestPathOrder);
  }
  /*
  getNodesInShortestPathOrderBFS(startNode,finishNode,previous) {
    //let x=0;
    /*for(let row=0;row<23;row++){
        for(let col=0;col<57;col++){
            if(row===12 && col>12 && col!==15){
                alert(previous[row][col].col);
            }
        }
    }
  alert(previous[12][27].row);
  alert(previous[12][27].col);
  const arr = [finishNode];
  let currentNode = finishNode;
  while (currentNode !== startNode && currentNode!==null) {
    const {row,col} = currentNode;
    currentNode=previous[row][col];
    arr.push(currentNode);
  }
  const nodesInShortestPathOrder=[];
  for(let i=arr.length-1;i>=0;i--){
      nodesInShortestPathOrder.push(arr[i]);
  }
  return nodesInShortestPathOrder;
}
  visualizeBFS(){
    const {grid} = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    //const visitedNodesInOrder= bfs(grid, startNode, finishNode);
    const previous=bfs(grid, startNode, finishNode);
    const nodesInShortestPathOrder = this.getNodesInShortestPathOrderBFS(startNode,finishNode,previous);
    alert(nodesInShortestPathOrder);
    /*this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  }*/

  //generates a maze using DFS
  mazeGeneration(grid){
    for (let row = 0; row < 23; row++) {
      for (let col = 0; col < 57; col++) {
        if((row+col)%2===0){
          const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
          this.setState({grid: newGrid, mouseIsPressed: false});
        }
      }
    }
    this.DFS(grid,START_NODE_ROW,START_NODE_COL);
    for (let row = 0; row < 23; row++) {
      for (let col = 0; col < 57; col++) {
        if((row+col)%2===1){
          grid[row][col].isVisited=false;
        }
      }
    }

  }

  //DFS algorithm to create a random maze
  DFS(grid,row,col){
    let newGrid = getNewGridWithNodeVisited(this.state.grid, row, col);
    this.setState({grid: newGrid, mouseIsPressed: false});
    let x=1;
    let stack1=[row];
    let stack2=[col];
    while (x>0){
      let curRow=stack1.pop();
      let curCol=stack2.pop();
      x--;
      newGrid = getNewGridWithNodeVisited(this.state.grid, row, col);
      this.setState({grid: newGrid, mouseIsPressed: false});
      let temp=0;
    let array=[]
    if (curRow>1){
      if (grid[curRow-2][curCol].isVisited===false){
        temp+=1;
        array.push(1);
      }
    }
    if (curCol>2){
      if (grid[curRow][curCol-2].isVisited===false){
        temp+=1;
        array.push(2);
      }
    }
    if (curRow<21){
      if (grid[curRow+2][curCol].isVisited===false){
        temp+=1;
        array.push(3);
      }
    }
    if(curCol<55){
      if (grid[curRow][curCol+2].isVisited===false){
        temp+=1;
        array.push(4);
      }
    }
    while (temp>0){
      
      let y=Math.floor(Math.random()*temp);
      if (array[y]===1){
        array.splice(y,1);
        newGrid = getNewGridWithWallToggled(this.state.grid, curRow-1, curCol);
        this.setState({grid: newGrid, mouseIsPressed: false});
        stack1.push(curRow-2);
        stack2.push(curCol);
        x++;
        newGrid = getNewGridWithNodeVisited(this.state.grid, curRow-2, curCol);
        this.setState({grid: newGrid, mouseIsPressed: false});
      }
      else if(array[y]===2){
        array.splice(y,1);
        newGrid = getNewGridWithWallToggled(this.state.grid, curRow, curCol-1);
        this.setState({grid: newGrid, mouseIsPressed: false});
        stack1.push(curRow);
        stack2.push(curCol-2);
        x++;
        newGrid = getNewGridWithNodeVisited(this.state.grid, curRow, curCol-2);
        this.setState({grid: newGrid, mouseIsPressed: false});
      }
      else if(array[y]===3){
        array.splice(y,1);
        newGrid = getNewGridWithWallToggled(this.state.grid, curRow+1, curCol);
        this.setState({grid: newGrid, mouseIsPressed: false});
        stack1.push(curRow+2);
        stack2.push(curCol);
        x++;
        newGrid = getNewGridWithNodeVisited(this.state.grid, curRow+2, curCol);
        this.setState({grid: newGrid, mouseIsPressed: false});
      }
      else if(array[y]===4){
        array.splice(y,1);
        newGrid = getNewGridWithWallToggled(this.state.grid, curRow, curCol+1);
        this.setState({grid: newGrid, mouseIsPressed: false});
        stack1.push(curRow);
        stack2.push(curCol+2);
        x++;
        newGrid = getNewGridWithNodeVisited(this.state.grid, curRow, curCol+2);
        this.setState({grid: newGrid, mouseIsPressed: false});
      }
      temp--;
    }
    }
  }

  //add random vertical walls in the grid
  mazeWithVerticalWalls(grid){
    for (let row = 0; row < 23; row++) {
      for (let col = 0; col < 57; col++) {
        if(((row===0 || col===0)||(row===22 || col===56))&&(grid[row][col].isWall===false)){
          const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
          this.setState({grid: newGrid, mouseIsPressed: false});
        }
      }
    }
    for (let col = 2; col < 55; col+=2){
      let row=1
      while(row<22) {
        let x=Math.ceil((22-row)*Math.random());
        if (x===21){
          x--;
        }
        while(x>0){
          const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
          this.setState({grid: newGrid, mouseIsPressed: false});
          row++;
          x--;
        }
        row++;
      }
    }
  }
  
  //generates a random maze using DFS algorithm and algorithm to add vertical walls
  randomMazeGenerator(grid){
    for (let row = 0; row < 23; row++) {
      for (let col = 0; col < 57; col++) {
        if((row+col)%2===0){
          const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
          this.setState({grid: newGrid, mouseIsPressed: false});
        }
      }
    }
    this.DFS(grid,START_NODE_ROW,START_NODE_COL);
    for (let row = 0; row < 23; row++) {
      for (let col = 0; col < 57; col++) {
        if((row+col)%2===1){
          grid[row][col].isVisited=false;
        }
      }
    }
    for (let row = 0; row < 23; row++) {
      for (let col = 0; col < 57; col++) {
        if(((row===0 || col===0)||(row===22 || col===56))&&(grid[row][col].isWall===false)){
          const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
          this.setState({grid: newGrid, mouseIsPressed: false});
        }
      }
    }
    for (let col = 2; col < 55; col+=2){
      let row=1
      while(row<22) {
        let x=Math.ceil((22-row)*Math.random());
        if (x===21){
          x--;
        }
        while(x>0){
          const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
          this.setState({grid: newGrid, mouseIsPressed: false});
          row++;
          x--;
        }
        row++;
      }
    }
  }

  //Kruksal's algorithm to create a random maze
  mazeUsingKruskal(grid){
    let verticalWalls=[];
    let horizontalWalls=[];
    let z=0;
    let y=0;
    let parent=[];
    for (let row = 0; row < 23; row++) {
      let temp=[];
      for (let col = 0; col < 57; col++) {
        if((((row+col)%2===0)||(row%2===0))&&((row!==START_NODE_ROW || col!==START_NODE_COL)&&(row!==FINISH_NODE_ROW || col!==FINISH_NODE_COL))){
          const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
          this.setState({grid: newGrid, mouseIsPressed: false});
        }
        if((((row+col)%2===0)&&(row%2===0))&&(row!==0 && row!==22)){
          verticalWalls.push([row,col]);
          z++;
        }
        if(((row+col)%2===0)&&(row%2===1)){
          horizontalWalls.push([row,col]);
          y++;
        }
        temp.push([row,col]);
      }
      parent.push(temp);
    }
    let temp1=Math.floor(4*Math.random());
    if(temp1===0){
      parent[START_NODE_ROW-1][START_NODE_COL][0]=parent[START_NODE_ROW-1][START_NODE_COL-1][0];
      parent[START_NODE_ROW-1][START_NODE_COL][1]=parent[START_NODE_ROW-1][START_NODE_COL-1][1];
      parent[START_NODE_ROW-1][START_NODE_COL+1][0]=parent[START_NODE_ROW-1][START_NODE_COL-1][0];
      parent[START_NODE_ROW-1][START_NODE_COL+1][1]=parent[START_NODE_ROW-1][START_NODE_COL-1][1];
      grid[START_NODE_ROW-1][START_NODE_COL].isWall=false;
      y--;
    }
    else if(temp1===1){
      parent[START_NODE_ROW-1][START_NODE_COL+1][0]=parent[START_NODE_ROW+1][START_NODE_COL+1][0];
      parent[START_NODE_ROW-1][START_NODE_COL+1][1]=parent[START_NODE_ROW+1][START_NODE_COL+1][1];
      parent[START_NODE_ROW][START_NODE_COL+1][0]=parent[START_NODE_ROW+1][START_NODE_COL+1][0];
      parent[START_NODE_ROW][START_NODE_COL+1][1]=parent[START_NODE_ROW+1][START_NODE_COL+1][1];
      grid[START_NODE_ROW][START_NODE_COL+1].isWall=false;
      z--;
    }
    else if(temp1===2){
      parent[START_NODE_ROW+1][START_NODE_COL-1][0]=parent[START_NODE_ROW+1][START_NODE_COL+1][0];
      parent[START_NODE_ROW+1][START_NODE_COL-1][1]=parent[START_NODE_ROW+1][START_NODE_COL+1][1];
      parent[START_NODE_ROW+1][START_NODE_COL][0]=parent[START_NODE_ROW+1][START_NODE_COL+1][0];
      parent[START_NODE_ROW+1][START_NODE_COL][1]=parent[START_NODE_ROW+1][START_NODE_COL+1][1];
      grid[START_NODE_ROW+1][START_NODE_COL].isWall=false;
      y--;
    }
    else{
      parent[START_NODE_ROW][START_NODE_COL-1][0]=parent[START_NODE_ROW-1][START_NODE_COL-1][0];
      parent[START_NODE_ROW][START_NODE_COL-1][1]=parent[START_NODE_ROW-1][START_NODE_COL-1][1];
      parent[START_NODE_ROW+1][START_NODE_COL-1][0]=parent[START_NODE_ROW-1][START_NODE_COL-1][0];
      parent[START_NODE_ROW+1][START_NODE_COL-1][1]=parent[START_NODE_ROW-1][START_NODE_COL-1][1];
      grid[START_NODE_ROW][START_NODE_COL-1].isWall=false;
      z--;
    }
    let temp2=Math.floor(4*Math.random());
    if(temp2===0){
      parent[FINISH_NODE_ROW-1][FINISH_NODE_COL][0]=parent[FINISH_NODE_ROW-1][FINISH_NODE_COL-1][0];
      parent[FINISH_NODE_ROW-1][FINISH_NODE_COL][1]=parent[FINISH_NODE_ROW-1][FINISH_NODE_COL-1][1];
      parent[FINISH_NODE_ROW-1][FINISH_NODE_COL+1][0]=parent[FINISH_NODE_ROW-1][FINISH_NODE_COL-1][0];
      parent[FINISH_NODE_ROW-1][FINISH_NODE_COL+1][1]=parent[FINISH_NODE_ROW-1][FINISH_NODE_COL-1][1];
      grid[FINISH_NODE_ROW-1][FINISH_NODE_COL].isWall=false;
      y--;
    }
    else if(temp2===1){
      parent[FINISH_NODE_ROW-1][FINISH_NODE_COL+1][0]=parent[FINISH_NODE_ROW+1][FINISH_NODE_COL+1][0];
      parent[FINISH_NODE_ROW-1][FINISH_NODE_COL+1][1]=parent[FINISH_NODE_ROW+1][FINISH_NODE_COL+1][1];
      parent[FINISH_NODE_ROW][FINISH_NODE_COL+1][0]=parent[FINISH_NODE_ROW+1][FINISH_NODE_COL+1][0];
      parent[FINISH_NODE_ROW][FINISH_NODE_COL+1][1]=parent[FINISH_NODE_ROW+1][FINISH_NODE_COL+1][1];
      grid[FINISH_NODE_ROW][FINISH_NODE_COL+1].isWall=false;
      z--;
    }
    else if(temp2===2){
      parent[FINISH_NODE_ROW+1][FINISH_NODE_COL-1][0]=parent[FINISH_NODE_ROW+1][FINISH_NODE_COL+1][0];
      parent[FINISH_NODE_ROW+1][FINISH_NODE_COL-1][1]=parent[FINISH_NODE_ROW+1][FINISH_NODE_COL+1][1];
      parent[FINISH_NODE_ROW+1][FINISH_NODE_COL][0]=parent[FINISH_NODE_ROW+1][FINISH_NODE_COL+1][0];
      parent[FINISH_NODE_ROW+1][FINISH_NODE_COL][1]=parent[FINISH_NODE_ROW+1][FINISH_NODE_COL+1][1];
      grid[FINISH_NODE_ROW+1][FINISH_NODE_COL].isWall=false;
      y--;
    }
    else{
      parent[FINISH_NODE_ROW][FINISH_NODE_COL-1][0]=parent[FINISH_NODE_ROW-1][FINISH_NODE_COL-1][0];
      parent[FINISH_NODE_ROW][FINISH_NODE_COL-1][1]=parent[FINISH_NODE_ROW-1][FINISH_NODE_COL-1][1];
      parent[FINISH_NODE_ROW+1][FINISH_NODE_COL-1][0]=parent[FINISH_NODE_ROW-1][FINISH_NODE_COL-1][0];
      parent[FINISH_NODE_ROW+1][FINISH_NODE_COL-1][1]=parent[FINISH_NODE_ROW-1][FINISH_NODE_COL-1][1];
      grid[FINISH_NODE_ROW][FINISH_NODE_COL-1].isWall=false;
      z--;
    }
    while(y>0 && z>0){
      let x=Math.floor(2*Math.random());
      if(x===0){
        let ind1=Math.floor(y*Math.random());
        if(ind1===y){
          ind1--;
        }
        let curRow=horizontalWalls[ind1][0];
        let curCol=horizontalWalls[ind1][1];
        let a=parent[curRow][curCol-1][0];
        let b=parent[curRow][curCol-1][1];
        if ((parent[curRow][curCol+1][0]!==a)||(parent[curRow][curCol+1][1]!==b)){
          for (let row = 0; row < 23; row++) {
            for (let col = 0; col < 57; col++) {
              if((row!==curRow || col!==curCol+1)&&(parent[row][col][0]===parent[curRow][curCol+1][0] && parent[row][col][1]===parent[curRow][curCol+1][1])){
                parent[row][col][0]=a;
                parent[row][col][1]=b;
              }
            }
          }
          parent[curRow][curCol+1][0]=a;
          parent[curRow][curCol+1][1]=b;
          parent[curRow][curCol][0]=a;
          parent[curRow][curCol][1]=b;
          grid[curRow][curCol].isWall=false;
        }
        horizontalWalls.splice(ind1,1);
        y--;
      }
      else{
        let ind2=Math.floor(z*Math.random());
        if(ind2===z){
          ind2--;
        }
        let curRow=verticalWalls[ind2][0];
        let curCol=verticalWalls[ind2][1];
        let a=parent[curRow-1][curCol][0];
        let b=parent[curRow-1][curCol][1];
        if ((parent[curRow+1][curCol][0]!==a)||(parent[curRow+1][curCol][1]!==b)){
          for (let row = 0; row < 23; row++) {
            for (let col = 0; col < 57; col++) {
              if((row!==curRow+1 || col!==curCol)&&(parent[row][col][0]===parent[curRow+1][curCol][0] && parent[row][col][1]===parent[curRow+1][curCol][1])){
                parent[row][col][0]=a;
                parent[row][col][1]=b;
              }
            }
          }
          parent[curRow+1][curCol][0]=a;
          parent[curRow+1][curCol][1]=b;
          parent[curRow][curCol][0]=a;
          parent[curRow][curCol][1]=b;
          grid[curRow][curCol].isWall=false;
        }
        verticalWalls.splice(ind2,1);
        z--;
      }
    }
    
    while(y>0){
      let ind1=Math.floor(y*Math.random());
        let curRow=horizontalWalls[ind1][0];
        let curCol=horizontalWalls[ind1][1];
        let a=parent[curRow][curCol-1][0];
        let b=parent[curRow][curCol-1][1];
        if ((parent[curRow][curCol+1][0]!==a)||(parent[curRow][curCol+1][1]!==b)){
          for (let row = 0; row < 23; row++) {
            for (let col = 0; col < 57; col++) {
              if((row!==curRow || col!==curCol+1)&&(parent[row][col][0]===parent[curRow][curCol+1][0] && parent[row][col][1]===parent[curRow][curCol+1][1])){
                parent[row][col][0]=a;
                parent[row][col][1]=b;
              }
            }
          }
          parent[curRow][curCol+1][0]=a;
          parent[curRow][curCol+1][1]=b;
          parent[curRow][curCol][0]=a;
          parent[curRow][curCol][1]=b;
          grid[curRow][curCol].isWall=false;
        }
        horizontalWalls.splice(ind1,1);
        y--;
    }
    while(z>0){
      let ind2=Math.floor(z*Math.random());
        let curRow=verticalWalls[ind2][0];
        let curCol=verticalWalls[ind2][1];
        let a=parent[curRow-1][curCol][0];
        let b=parent[curRow-1][curCol][1];
        if ((parent[curRow+1][curCol][0]!==a)||(parent[curRow+1][curCol][1]!==b)){
          for (let row = 0; row < 23; row++) {
            for (let col = 0; col < 57; col++) {
              if((row!==curRow+1 || col!==curCol)&&(parent[row][col][0]===parent[curRow+1][curCol][0] && parent[row][col][1]===parent[curRow+1][curCol][1])){
                parent[row][col][0]=a;
                parent[row][col][1]=b;
              }
            }
          }
          parent[curRow+1][curCol][0]=a;
          parent[curRow+1][curCol][1]=b;
          parent[curRow][curCol][0]=a;
          parent[curRow][curCol][1]=b;
          grid[curRow][curCol].isWall=false;
        }
        verticalWalls.splice(ind2,1);
        z--;
    }
  }
    
  //Prim's algorithm to create a random maze
  mazeUsingPrim(grid){
    let walls=[];
    let len=0;
    for (let row = 0; row < 23; row++) {
      for (let col = 0; col < 57; col++) {
        if((((row+col)%2===0)||(row%2===0))&&(row!==FINISH_NODE_ROW-1 || col!==FINISH_NODE_COL)&&(row!==START_NODE_ROW || col!==START_NODE_COL-1)&&(row!==FINISH_NODE_ROW || col!==FINISH_NODE_COL+1)&&((row!==START_NODE_ROW || col!==START_NODE_COL)&&(row!==FINISH_NODE_ROW || col!==FINISH_NODE_COL))){
          const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
          this.setState({grid: newGrid, mouseIsPressed: false});
        }
      }
    }
    walls.push([START_NODE_ROW-1,START_NODE_COL]);
    walls.push([START_NODE_ROW+1,START_NODE_COL]);
    walls.push([START_NODE_ROW,START_NODE_COL+1]);
    grid[START_NODE_ROW][START_NODE_COL].isVisited=true;
    grid[START_NODE_ROW][START_NODE_COL-1].isVisited=true;
    grid[FINISH_NODE_ROW][FINISH_NODE_COL+1].isVisited=true;
    walls.push([START_NODE_ROW-1,START_NODE_COL-2]);
    walls.push([START_NODE_ROW-2,START_NODE_COL-1]);
    walls.push([START_NODE_ROW+1,START_NODE_COL-2]);
    walls.push([START_NODE_ROW+2,START_NODE_COL-1]);
    grid[START_NODE_ROW-1][START_NODE_COL-1].isVisited=true;
    grid[START_NODE_ROW+1][START_NODE_COL-1].isVisited=true;
    grid[FINISH_NODE_ROW-1][FINISH_NODE_COL+1].isVisited=true;
    grid[FINISH_NODE_ROW+1][FINISH_NODE_COL+1].isVisited=true;
    walls.push([FINISH_NODE_ROW-1,FINISH_NODE_COL+2]);
    walls.push([FINISH_NODE_ROW-2,FINISH_NODE_COL+1]);
    walls.push([FINISH_NODE_ROW+1,FINISH_NODE_COL+2]);
    walls.push([FINISH_NODE_ROW+2,FINISH_NODE_COL+1]);
    len=11;
    while (len>0){
      let x=Math.floor(len*Math.random());
      if(x===len){
        x--;
      }
      let curRow=walls[x][0];
      let curCol=walls[x][1];
      let y=0;
      let z=0;
      if(curRow%2===1){
        if (curCol!==0 && grid[curRow][curCol-1].isVisited===false){
          y++;
          z=0;
        }
        if (curCol<56 && curCol>=-1 && curRow>=0 && curRow<=22 && grid[curRow][curCol+1].isVisited===false){
          y++;
          z=1;
        }
      }
      if(curRow%2===0){
        if (curRow!==0 && grid[curRow-1][curCol].isVisited===false){
          y++;
          z=0;
        }
        if (curRow!==22 && grid[curRow+1][curCol].isVisited===false){
          y++;
          z=1;
        }
      }
      if(y===1){
        grid[curRow][curCol].isWall=false;
        grid[curRow][curCol].isVisited=true;
        if(curRow%2===1){
          if(z===0){
            grid[curRow][curCol-1].isVisited=true;
            if(curCol-1===0){
              if(curRow-1!==0 && grid[curRow-1][curCol-1].isWall===true){
                walls.push([curRow-1,curCol-1]);
                len++;
              }
              if(curRow+1!==22 && grid[curRow+1][curCol-1].isWall===true ){
                walls.push([curRow+1,curCol-1]);
                len++;
              }
            }
            else{
              if(curRow-1!==0 && grid[curRow-1][curCol-1].isWall===true){
                walls.push([curRow-1,curCol-1]);
                len++;
              }
              if(curRow+1!==22 && grid[curRow+1][curCol-1].isWall===true){
                walls.push([curRow+1,curCol-1]);
                len++;
              }
              if(grid[curRow][curCol-2].isWall===true){
                walls.push([curRow,curCol-2]);
                len++;
              }
            }
          }
          else{
            grid[curRow][curCol+1].isVisited=true;
            if(curCol+1===56){
              if(curRow-1!==0 && grid[curRow-1][curCol+1].isWall===true){
                walls.push([curRow-1,curCol+1]);
                len++;
              }
              if(curRow+1!==22 && grid[curRow+1][curCol+1].isWall===true){
                walls.push([curRow+1,curCol+1]);
                len++;
              }
            }
            else{
              if(curRow-1!==0 && grid[curRow-1][curCol+1].isWall===true ){
                walls.push([curRow-1,curCol+1]);
                len++;
              }
              if(curRow+1!==22 && grid[curRow+1][curCol+1].isWall===true){
                walls.push([curRow+1,curCol+1]);
                len++;
              }
              if(grid[curRow][curCol+2].isWall===true){
                walls.push([curRow,curCol+2]);
                len++;
              }
            }
          }
        }
        else{
          if(z===0){
            grid[curRow-1][curCol].isVisited=true;
            if(curRow-1===1){
              if(curCol!==56 && grid[curRow-1][curCol+1].isWall===true){
                walls.push([curRow-1,curCol+1]);
                len++;
              }
              if(curCol!==0 && grid[curRow-1][curCol-1].isWall===true){
                walls.push([curRow-1,curCol+1]);
                len++;
              }
            }
            else{
              if(curCol!==56 && grid[curRow-1][curCol+1].isWall===true){
                walls.push([curRow-1,curCol+1]);
                len++;
              }
              if(curCol!==0 && grid[curRow-1][curCol-1].isWall===true){
                walls.push([curRow-1,curCol+1]);
                len++;
              }
              if(grid[curRow-2][curCol].isWall===true){
                walls.push([curRow-2,curCol]);
                len++;
              }
            }
            
          }
          else{
            grid[curRow+1][curCol].isVisited=true;
            if(curRow+1===21){
              if(curCol!==56 && grid[curRow+1][curCol+1].isWall===true){
                walls.push([curRow+1,curCol+1]);
                len++;
              }
              if(curCol!==0 && grid[curRow+1][curCol-1].isWall===true){
                walls.push([curRow+1,curCol+1]);
                len++;
              }
            }
            else{
              if(curCol!==56 && grid[curRow+1][curCol+1].isWall===true){
                walls.push([curRow+1,curCol+1]);
                len++;
              }
              if(curCol!==0 && grid[curRow+1][curCol-1].isWall===true){
                walls.push([curRow+1,curCol+1]);
                len++;
              }
              if(grid[curRow+2][curCol].isWall===true){
                walls.push([curRow+2,curCol]);
                len++;
              }
            }
          }
        }
      }
      walls.splice(x,1);
      len--;
    }
    for (let row = 0; row < 23; row++) {
      for (let col = 0; col < 57; col++) {
        if(grid[row][col].isVisited===true){
          grid[row][col].isVisited=false;
        }
      }
    }
  }

  //to redirect to the tutorial of pathfinding visualizer 
  changeLocation(){
    window.location.href = "https://shubhdoshi.github.io/pathfinder-tutorial/";
  }
  
  //main code
  render() {
    const {grid, mouseIsPressed} = this.state;
    return (
      <>
        <html>
  <head>
    <title>Pathfinding Visualizer</title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.5/umd/popper.js"/>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"/>
    <link id="cssTheme" rel="stylesheet" href="CSS/styles.css"/>
    <script src="https://kit.fontawesome.com/9f428f52b3.js" crossorigin="anonymous"></script>
  </head>
  <body>
      <div id='navigationBar'>
     <nav className="navbar navbar-inverse">
       <div className="container-fluid">
         <div class="refresh" className="navbar-header">
           <button onClick={() => window.location.reload(false)} id="refreshPage" className="navigation navbar-brand" href="#">Pathfinding Visualizer</button>
         </div>
         <ul className="nav navbar-nav">
           <li id="mazePattern" className="navigation dropdown">
           <Dropdown>
           <Dropdown.Toggle variant="success" id="dropdown-basic">
              Mazes and Patterns <span className="caret"></span>
           </Dropdown.Toggle>
           <Dropdown.Menu>
           <Dropdown.Item id="maze1" onClick={() => this.mazeUsingKruskal(grid)} href="#/action-4"><p>Maze using Kruskal's Algorithm</p></Dropdown.Item>
           <Dropdown.Item id="maze2" onClick={() => this.mazeGeneration(grid)} href="#/action-1"><p>Maze using Depth First Search</p></Dropdown.Item>
           <Dropdown.Item id="maze3" onClick={() => this.mazeUsingPrim(grid)} href="#/action-5"><p>Maze using Prim's Algorithm</p></Dropdown.Item>
           <Dropdown.Item id="maze4" onClick={() => this.mazeWithVerticalWalls(grid)} href="#/action-2"><p>Add Vertical Walls</p></Dropdown.Item>
           <Dropdown.Item id="maze5" onClick={() => this.randomMazeGenerator(grid)} href="#/action-3"><p>Random Maze Generator</p></Dropdown.Item>
           </Dropdown.Menu>
           </Dropdown>
           </li>
           <li className="dropdown">
           <Dropdown>
           <Dropdown.Toggle variant="success" id="dropdown-basic">
              Speed <span className="caret"></span>
           </Dropdown.Toggle>
           <Dropdown.Menu>
           <Dropdown.Item onClick={() => this.visualizeDijkstraFast()} href="#/action-1"><p>Fast</p></Dropdown.Item>
           <Dropdown.Item onClick={() => this.visualizeDijkstraMedium()} href="#/action-2"><p>Medium</p></Dropdown.Item>
           <Dropdown.Item onClick={() => this.visualizeDijkstraSlow()} href="#/action-3"><p>Slow</p></Dropdown.Item>
           </Dropdown.Menu>
           </Dropdown>
           </li>
           <li id='visualize'><button id='startButtonStart' onClick={() => this.visualizeDijkstraFast()}>
          Visualize 
        </button></li>
           <li className="navigation"><button onClick={() => window.location.reload(false)} id='startButtonClearBoard' href="#">Clear Board</button></li>
           <li className="navigation"><button id='help' onClick={() => this.changeLocation()}>How to use?</button></li>
         </ul>
       </div>
     </nav>
   </div>
   <div>
    <p className="a"><FontAwesomeIcon icon={faSquareFull} id='startNode' />Start-Node <FontAwesomeIcon icon={faSquareFull} id='targetNode' />Target-Node <FontAwesomeIcon icon={faSquareFull} id='wallNode'/>Wall-Node <FontAwesomeIcon icon={faSquareFull} id='visitedNode'/>Visited-Nodes <FontAwesomeIcon icon={faSquareFull} id='unvisitedNode'/>Unvisited-Node <FontAwesomeIcon icon={faSquareFull} id='shortestPathNode'/>Shortest-path-Node </p>
   </div>
   </body>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
</html>
        
        <div className="grid">
          {grid.map((row, rowIdx) => {
            return (
              <div id='row-0' key={rowIdx}>
                {row.map((node, nodeIdx) => {
                  const {row, col, isFinish, isStart, isWall} = node;
                  return (              
                    <Node
                      key={nodeIdx}
                      col={col}
                      isFinish={isFinish}
                      isStart={isStart}
                      isWall={isWall}
                      mouseIsPressed={mouseIsPressed}
                      onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                      onMouseEnter={(row, col) =>
                        this.handleMouseEnter(row, col)
                      }
                      onMouseUp={() => this.handleMouseUp()}
                      row={row}></Node>
                  );
                })}
              </div>
            );
          })}
        </div>
      </>
    );
  }
}

//to create the initial grid
const getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < 23; row++) {
    const currentRow = [];
    for (let col = 0; col < 57; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};

//to create a node of the grid
const createNode = (col, row) => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
  };
};

//to change the current state of wall of the node
const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};

//to change the current state of visit of the node
const getNewGridWithNodeVisited = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isVisited: !node.isVisited,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};


