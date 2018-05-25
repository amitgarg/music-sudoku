import React from 'react';
import '../css/ColorBox.css';
export default class ColorBox extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { colors, onColorSelect } = this.props;
    function onSelect(index) {
      return function(e) {
        onColorSelect(index);
      };
    }
    return (
      <div className="ColorBox">
        <div className="defaultRow">
          <div className="colorCell default" onClick={onSelect(-1)} />
          <button onClick={this.props.onNoChange}>Leave it</button>
        </div>
        <div className="ColorGrid">
          {colors.map((color, index) => (
            <div
              key={index}
              className="colorCell"
              onClick={onSelect(index)}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>
    );
  }
}
