import React from 'react';
import '../css/Cell.css';
import FixedCell from './FixedCell';

const Cell = props => {
  console.log('Rendering Cell');
  const { cellSize, data, cellInfo } = props;
  var cellSizePx = cellSize + 'px';
  function handleChange(e) {
    props.onChange(e.currentTarget.value);
  }

  function handleNoteClick() {
    if (data.value > 0) {
      props.handleNote(cellInfo.notesArray[data.value - 1]);
    } else {
      props.handleNote(0);
    }
  }
  function stopSound() {
    props.handleNote(0);
  }
  const cellType = cellInfo.type;
  function getDisplayValue(value) {
    if (cellType === 'icons') {
      return props.cellInfo.iconsArray[value];
    } else if (cellType == 'music') {
      return props.cellInfo.notationsArray[value];
    } else {
      return value + 1;
    }
  }

  return (
    <div
      className="Cell"
      style={{ width: cellSizePx, height: cellSizePx, position: 'relative' }}
    >
      {cellType === 'music' &&
        data.value > 0 && (
          <button className="btn" onMouseDown={handleNoteClick} onMouseUp={stopSound}>
            play
          </button>
        )}

      {data.fixed ? (
        <FixedCell
          value={getDisplayValue(data.value-1)}
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
          <option value="0"> </option>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(
            val =>
              cellType == 'numbers' ? (
                <option key={val} value={val + 1}>
                  {getDisplayValue(val)}
                </option>
              ) : cellType == 'icons' ? (
                <option
                  key={val}
                  value={val + 1}
                  dangerouslySetInnerHTML={{ __html: getDisplayValue(val) }}
                />
              ) : (
                <option key={val} value={val + 1}>
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
