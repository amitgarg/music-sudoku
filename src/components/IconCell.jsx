import React from 'react';
import '../css/Cell.css';

const IconCell = ({ cellSize, data, cellInfo, onChange }) => {
  function handleChange(e) {
    onChange(e.currentTarget.value);
  }

  return data.fixed ? (
    <div
      className={`${cellInfo.type} disabled`}
      dangerouslySetInnerHTML={{ __html: cellInfo.dataArray[data.value] }}
      style={{ fontSize: 0.7 * cellSize + 'px' }}
    />
  ) : (
    <select
      value={data.value}
      onChange={handleChange}
      className={cellInfo.type}
      style={{ fontSize: 0.7 * cellSize + 'px', paddingRight: 0.1 * cellSize + 'px' }}
    >
      <option value="-1"> </option>
      {cellInfo.dataArray.map((val, index) => (
        <option key={index} value={index} dangerouslySetInnerHTML={{ __html: val }} />
      ))}
    </select>
  );
};

export default IconCell;
