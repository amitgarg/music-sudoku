import React from 'react';
import Cell from './Cell';
import '../css/Pallette.css';
import { updateNote } from '../utils';

const Pallette = props => {
  const { cellSize, cellInfo } = props;
  function renderCell(data, index) {
    var newCellInfo = {
      type: 'music',
      dataArray: cellInfo.dataArray,
      exposeFixed: true,
      exposeSelected: true
    };
    return (
      <Cell
        key={index}
        data={{ value: index, fixed: true }}
        cellSize={cellSize}
        cellInfo={newCellInfo}
        handleNote={updateNote}
      />
    );
  }

  return cellInfo.type == 'music' && (
    <div className="Pallette" >
      {props.cellInfo.dataArray.map(renderCell)}
    </div>
  );
};

export default Pallette;
