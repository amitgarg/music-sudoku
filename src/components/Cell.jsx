import React from 'react';
import '../css/Cell.css';
import FixedCell from './FixedCell';
import { range } from '../utils';
import { freq } from 'tonal-note';

const Cell = props => {
  const { cellSize, data, cellInfo } = props;
  var cellSizePx = cellSize + 'px';
  const cellType = cellInfo.type;

  function handleChange(e) {
    props.onChange(e.currentTarget.value);
  }

  function handleNoteClick() {
    if (data.value > -1) {
      props.handleNote(freq(cellInfo.dataArray[data.value]));
    } else {
      props.handleNote(0);
    }
  }

  function stopSound() {
    props.handleNote(0);
  }

  function getDisplayValue(value) {
    return props.cellInfo.dataArray[value];
  }

  return (
    <div
      className="Cell"
      style={{ width: cellSizePx, height: cellSizePx, position: 'relative' }}
    >
      {cellType === 'music' &&
        data.value > -1 && (
          <button className="btn" onMouseDown={handleNoteClick} onMouseUp={stopSound}>
            play
          </button>
        )}

      {data.fixed ? (
        <FixedCell
          value={getDisplayValue(data.value)}
          cellType={cellType}
          exposeFixed={props.cellInfo.exposeFixed}
        />
      ) : (
        <select
          name={props.name}
          value={data.value}
          onChange={handleChange}
          className={cellType}
        >
          <option value="-1"> </option>
          {range(0, props.cellInfo.dataArray.length).map(
            val =>
              cellType == 'numbers' ? (
                <option key={val} value={val}>
                  {getDisplayValue(val)}
                </option>
              ) : cellType == 'icons' ? (
                <option
                  key={val}
                  value={val}
                  dangerouslySetInnerHTML={{ __html: getDisplayValue(val) }}
                />
              ) : (
                <option key={val} value={val}>
                  {props.cellInfo.exposeSelected ? getDisplayValue(val) : 'X'}
                </option>
              )
          )}
        </select>
      )}
    </div>
  );
};

export default Cell;
