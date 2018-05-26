import React from 'react';
import '../css/Cell.css';

class MusicCell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      exposed: props.cellInfo.exposeFixed
    };

    this.handleChange = this.handleChange.bind(this);
    this.toggleExpose = this.toggleExpose.bind(this);
  }
  handleChange(e) {
    this.props.onChange(e.currentTarget.value);
  }
  toggleExpose() {
    this.setState({ exposed: !this.state.exposed });
  }

  render() {
    const { cellSize, data, cellInfo, onChange, startEffects, stopEffects } = this.props;
    return (
      <div style={{ height: '100%' }}>
        {data.value > -1 && (
          <button className="btn" onMouseDown={startEffects} onMouseUp={stopEffects}>
            play
          </button>
        )}
        {data.fixed ? (
          <div className={`${cellInfo.type} disabled`}>
            {!cellInfo.exposeFixed && (
              <button
                className="btn expose"
                onMouseDown={this.toggleExpose}
                onMouseUp={this.toggleExpose}
              >
                expose
              </button>
            )}
            {this.state.exposed ? cellInfo.dataArray[data.value] : 'N'}
          </div>
        ) : (
          <select
            style={{ fontSize: 0.5 * cellSize + 'px' }}
            value={data.value}
            onChange={this.handleChange}
            className={cellInfo.type}
          >
            <option value="-1"> </option>
            {cellInfo.dataArray.map((val, index) => (
              <option key={index} value={index}>
                {val}
              </option>
            ))}
          </select>
        )}
      </div>
    );
  }
}

export default MusicCell;
