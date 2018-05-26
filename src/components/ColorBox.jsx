import React from 'react';
import '../css/ColorBox.css';
export default class ColorBox extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { colors, onColorSelect, value } = this.props;
    function onSelect(index) {
      return function(e) {
        onColorSelect(index);
      };
    }
    return (
      <div className="ColorBox">
        <div className="BoxContainer">
          <div className="defaultRow">
            <div className={`colorCell default ${value == -1 && 'highlighted'}`} onClick={onSelect(-1)} />
            <button onClick={this.props.onNoChange}>Leave it</button>
          </div>
          <div className="ColorGrid">
            {colors.map((color, index) => (
              <div
                key={index}
                className={`colorCell ${value == index && 'highlighted'}`}
                onClick={onSelect(index)}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}
