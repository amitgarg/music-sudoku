import React from 'react';
import '../css/Grid.css';
import Block from './Block';
import { range, initializeMusic, updateNote, stopMusic } from '../utils';


export default class Grid extends React.Component {
  constructor(props) {
    super(props);
    const gridSize = props.size * props.size;
    var gridState = [];
    var inputData = props.inputData;
    for (var i = 0; i < gridSize; i++) {
      var blockState = { isValid: false, values: [] };
      for (var j = 0; j < gridSize; j++) {
        blockState.values[j] =
          inputData[i] && inputData[i][j]
            ? { value: inputData[i][j], fixed: true }
            : { value: 0, fixed: false };
      }
      gridState[i] = blockState;
    }

    this.state = { gridState };
    this.handleChange = this.handleChange.bind(this);
    this.rowValues = this.rowValues.bind(this);
    this.columnValues = this.columnValues.bind(this);

    props.cellInfo.type === 'music' && initializeMusic();
  }

  rowValues(index) {
    const size = this.props.size;
    var rowIndex = index % size;
    var startBlock = index - rowIndex;

    var values = [];
    this.state.gridState.slice(startBlock, startBlock + size).forEach(blockData => {
      values = values.concat(blockData.slice(rowIndex * size, (rowIndex + 1) * size));
    });
    return values;
  }

  columnValues(index) {
    const size = this.props.size;
    var colIndex = index % size;
    var startBlock = (index - colIndex) / size;

    var values = [];
    var blockValuesArray = range(0, 3).map(
      val => this.state.gridState[startBlock + size * val]
    );

    blockValuesArray.forEach((blockValues, val) => {
      for (var j = 0; j < size; j++) {
        values[size * val + j] = blockValues[colIndex + size * j];
      }
    });
    return values;
  }

  validateValues(values) {
    return values
      .map(value => value.value)
      .sort()
      .every((val, index) => val == index + 1);
  }
  validateGrid() {
    var size = this.props.size * this.props.size;
    if (
      this.state.gridState.every(blockState => this.validateValues(blockState.values))
    ) {
      if (
        range(0, size)
          .map(this.rowValues)
          .every(this.validateValues)
      ) {
        return range(0, size)
          .map(this.columnValues)
          .every(this.validateValues);
      }
    }

    return false;
  }

  handleChange(value, block, cell) {
    const gridState = this.state.gridState.slice();
    var blockState = gridState[block];
    blockState.values = blockState.values.slice();
    blockState.values[cell].value = value;
    blockState.isValid = this.validateValues(blockState.values);
    this.setState({
      gridState
    });
    console.log(`Changed Block: ${block} Cell: ${cell} to Value: ${value}`);
    if (blockState.isValid) {
      this.validateGrid();
    }
  }

  renderBlock(values, blockSize, cellSize, index, isValid) {
    return (
      <Block
        key={index}
        blockIndex={index}
        values={values}
        size={this.props.size}
        cellSize={cellSize}
        blockSize={blockSize}
        onChange={this.handleChange}
        cellInfo={this.props.cellInfo}
        handleNote={updateNote}
        isValid={isValid}
        feedback={this.props.feedback}
      />
    );
  }

  componentWillUnmount() {
    stopMusic();
  }

  render() {
    const { size, cellSize } = this.props;
    const blockSize = size * cellSize + 5;
    let gridSize = size * blockSize + 'px';
    return (
      <div className="Grid" style={{ width: gridSize, height: gridSize }}>
        {this.state.gridState.map((blockState, index) =>
          this.renderBlock(
            blockState.values,
            blockSize,
            cellSize,
            index,
            blockState.isValid
          )
        )}
      </div>
    );
  }
}
