import React from 'react';
import '../css/Cell.css';

import { range } from '../utils';
import { freq } from 'tonal-note';
import ColorCell from './ColorCell';
import IconCell from './IconCell';
import NumberCell from './NumberCell';
import MusicCell from './MusicCell';

class Cell extends React.Component {
  constructor(props) {
    super(props);

    this.startEffects = this.startEffects.bind(this);
    this.stopEffects = this.stopEffects.bind(this);
  }

  startEffects() {
    const { data, cellInfo } = this.props;
    if (data.value > -1) {
      this.props.handleNote(freq(cellInfo.dataArray[data.value]));
    } else {
      this.props.handleNote(0);
    }
  }

  stopEffects() {
    this.props.handleNote(0);
  }

  render() {
    const { cellSize, data, cellInfo, onCellClick, onChange } = this.props;
    var cellSizePx = cellSize + 'px';
    const cellType = cellInfo.type;
    return (
      <div className="Cell" style={{ width: cellSizePx, height: cellSizePx }}>
        {cellInfo.type == 'colors' ? (
          <ColorCell cellInfo={cellInfo} data={data} handleCellClick={onCellClick} />
        ) : cellInfo.type == 'icons' ? (
          <IconCell
            cellSize={cellSize}
            cellInfo={cellInfo}
            data={data}
            onChange={onChange}
          />
        ) : cellInfo.type == 'numbers' ? (
          <NumberCell
            cellSize={cellSize}
            cellInfo={cellInfo}
            data={data}
            onChange={onChange}
          />
        ) : (
          <MusicCell
            cellSize={cellSize}
            cellInfo={cellInfo}
            data={data}
            onChange={onChange}
            startEffects={this.startEffects}
            stopEffects={this.stopEffects}
          />
        )}
      </div>
    );
  }
}

export default Cell;
