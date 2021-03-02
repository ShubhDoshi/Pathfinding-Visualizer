import React, {Component} from 'react';
import './Node.css';
import { Draggable, Droppable } from 'react-drag-and-drop'
export default class Node extends Component {
  render() {
    const {
      col,
      isFinish,
      isStart,
      isWall,
      onMouseDown,
      onMouseEnter,
      onMouseUp,
      row,
    } = this.props;
    let extraClassName = isFinish;
    if (isFinish===true){
      extraClassName='node-finish';
      return (
        <Draggable
          type="nodeOfGrid"
          id={`node-${row}-${col}`}
          className={`node ${extraClassName}`}
          onMouseDown={() => onMouseDown(row, col)}
          onMouseEnter={() => onMouseEnter(row, col)}
          onMouseUp={() => onMouseUp()}></Draggable>
      );
    }
    else if (isStart===true){
      extraClassName='node-start';
      return (
        <Draggable
          type={'nodeOfGrid'}
          id={`node-${row}-${col}`}
          className={`node ${extraClassName}`}
          onMouseDown={() => onMouseDown(row, col)}
          onMouseEnter={() => onMouseEnter(row, col)}
          onMouseUp={() => onMouseUp()}></Draggable>
      );
    }
    else if (isWall===true){
      extraClassName='node-wall';
    }

    return (
      <Droppable
        types={['nodeOfGrid']}
        onDrop={this.onDrop.bind(this)}
        id={`node-${row}-${col}`}
        className={`node ${extraClassName}`}
        onMouseDown={() => onMouseDown(row, col)}
        onMouseEnter={() => onMouseEnter(row, col)}
        onMouseUp={() => onMouseUp()}></Droppable>
    );
  }
  onDrop(data) {
    alert(data);
    // => banana 
}
}