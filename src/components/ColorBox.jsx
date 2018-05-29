import React from 'react';
import '../css/ColorBox.css';
export default class ColorBox extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { colors, onColorSelect, value, cellSize, size } = this.props;
    let blockSize = cellSize * size + 5 + 'px';
    function onSelect(index) {
      return function(e) {
        onColorSelect(index);
      };
    }
    const cellDimensions = 100 / size + '%';
    return (
      <div className="ColorBox">
        <div className="defaultRow" style={{ height: cellSize + 'px' }}>
          <div
            className={`colorCell default ${value == -1 && 'highlighted'}`}
            onClick={onSelect(-1)}
            style={{ width: cellSize + 'px' }}
          />
          <button onClick={this.props.onNoChange}>Leave it</button>
        </div>
        <div className="ColorGrid" style={{ width: blockSize, height: blockSize }}>
          {colors.map((color, index) => (
            <div
              key={index}
              className={`colorCell ${value == index && 'highlighted'}`}
              onClick={onSelect(index)}
              style={{
                backgroundColor: color,
                width: cellDimensions,
                height: cellDimensions
              }}
            />
          ))}
        </div>
      </div>
    );
  }
}
