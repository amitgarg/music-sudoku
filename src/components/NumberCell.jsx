import React from 'react';
import '../css/Cell.css';

const NumberCell = ({ cellSize, data, cellInfo, onChange }) => {
  function handleChange(e) {
    onChange(e.currentTarget.value);
  }

  return data.fixed ? (
    <div className={`${cellInfo.type} disabled`}>{cellInfo.dataArray[data.value]}</div>
  ) : (
    <select
      style={{ fontSize: 0.5 * cellSize + 'px' }}
      value={data.value}
      onChange={handleChange}
      className={cellInfo.type}
    >
      <option value="-1"> </option>
      {cellInfo.dataArray.map((val, index) => (
        <option key={index} value={index}>
          {val}
        </option>
      ))}
    </select>
  );
};

export default NumberCell;
