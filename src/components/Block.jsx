import React from 'react';
import '../css/Block.css';
import Cell from './Cell';
import ColorBox from './ColorBox';

class Block extends React.Component {
  constructor(props) {
    super(props);
    this.state = { colorBoxIsOpen: false, colorCellValue: -1, colorCellIndex: 0 };

    this.toggleColorBox = this.toggleColorBox.bind(this);
    this.handleColorSelect = this.handleColorSelect.bind(this);
    this.renderCell = this.renderCell.bind(this);
  }

  toggleColorBox(value, cellIndex) {
    this.setState({
      colorBoxIsOpen: !this.state.colorBoxIsOpen,
      colorCellValue: value,
      colorCellIndex: cellIndex
    });
  }

  handleColorSelect(value) {
    const { blockIndex } = this.props;
    this.props.onChange(value, blockIndex, this.state.colorCellIndex);
    this.toggleColorBox();
  }

  renderCell(data, index) {
    const {
      cellSize,
      blockSize,
      handleNote,
      feedback,
      isValid,
      cellInfo,
      onChange,
      blockIndex
    } = this.props;
    return (
      <Cell
        key={index}
        data={data}
        cellSize={cellSize}
        onChange={value => onChange(value, blockIndex, index)}
        cellInfo={cellInfo}
        handleNote={handleNote}
        onCellClick={() => this.toggleColorBox(data.value, index)}
      />
    );
  }

  render() {
    const {
      cellSize,
      blockSize,
      handleNote,
      feedback,
      isValid,
      cellInfo,
      onChange,
      blockIndex
    } = this.props;

    return (
      <div
        className={`Block ${feedback && isValid && 'valid'}`}
        style={{ width: blockSize, height: blockSize }}
      >
        {this.state.colorBoxIsOpen && (
          <ColorBox
            value={this.state.colorCellValue}
            colors={cellInfo.dataArray}
            onColorSelect={this.handleColorSelect}
            onNoChange={this.toggleColorBox}
          />
        )}
        {this.props.values.map(this.renderCell)}
      </div>
    );
  }
}

export default Block;
