import React from 'react';
import '../css/Block.css';
import Cell from './Cell';

const Block = props => {
  const { cellSize, blockSize, handleNote, feedback, isValid } = props;
  function renderCell(data, index) {
    return (
      <Cell
        key={index}
        data={data}
        cellSize={cellSize}
        onChange={value => props.onChange(value, props.blockIndex, index)}
        cellInfo={props.cellInfo}
        handleNote={handleNote}
      />
    );
  }

  return (
    <div className={`Block ${feedback && isValid && 'valid' }`} style={{ width: blockSize, height: blockSize }}>
      {props.values.map(renderCell)}
    </div>
  );
};

export default Block;
