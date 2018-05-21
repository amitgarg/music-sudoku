import React from 'react';
import Cell from './Cell';
import '../css/Pallette.css';

const Pallette = props => {
  const { cellSize, cellInfo, handleNote } = props;
  function renderCell(data, index) {
    var newCellInfo = {
      type: 'music',
        notesArray:cellInfo.notesArray,
        notationsArray:cellInfo.notationsArray,
        exposeFixed : true,
        exposeSelected : true
    }
    return (
      <Cell
        key={index}
        data={{value: index+1, fixed: true}}
        cellSize={cellSize}
        cellInfo={newCellInfo}
        handleNote={handleNote}
      />
    );
  }

  return (
    <div
      className='Pallette'
      style={{ width: cellSize, float: 'left' }}
    >
      {props.cellInfo.notationsArray.map(renderCell)}
    </div>
  );
};

export default Pallette;
