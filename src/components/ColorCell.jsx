import React from 'react';
import '../css/Cell.css';

const ColorCell = ({ cellInfo, data, handleCellClick }) => {
  return data.fixed ? (
    <div
      className={`${cellInfo.type} disabled`}
      style={{
        backgroundColor: cellInfo.dataArray[data.value],
        border: '1px dotted white'
      }}
    />
  ) : (
    <div
      className={cellInfo.type}
      onClick={e=>handleCellClick()}
      style={{ backgroundColor: cellInfo.dataArray[data.value] }}
    />
  );
};

export default ColorCell;
