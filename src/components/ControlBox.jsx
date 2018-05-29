import React from 'react';
import { names } from 'tonal-scale';
import '../css/ControlBox.css';

export default class ControlBox extends React.Component {
  constructor(props) {
    super(props);
    this.handleControlChanges = this.handleControlChanges.bind(this);
  }

  handleControlChanges(type) {
    var handleControlChange = this.props.handleControlChange;
    return function(value) {
      handleControlChange({ [type]: value });
    };
  }

  render() {
    const { size, cellType, feedback, musicKey, scale, octave, gridSize, cellSize } = this.props;
    return (
      <div style={{ margin: 'auto' , width: gridSize}}>
        <div className="ControlBox" style={{fontSize: 0.4 * cellSize + 'px'}}>
          <div className="halfWidth">
            <SelectBox
              label="Cell Type"
              value={cellType}
              onChangeHandler={this.handleControlChanges('cellType')}
              options={['numbers', 'icons', 'colors', 'music']}
            />
            <SelectBox
              label="Size"
              value={size}
              onChangeHandler={this.handleControlChanges('size')}
              options={[2, 3, 4]}
            />
          </div>
          <SelectBox
            label="Feedback"
            value={feedback}
            onChangeHandler={this.handleControlChanges('feedback')}
            options={[{ label: 'Yes', value: true }, { label: 'No', value: false }]}
          />
          {cellType === 'music' && (
            <div>
              <div className="halfWidth">
                <SelectBox
                  label="Music Key"
                  value={musicKey}
                  onChangeHandler={this.handleControlChanges('musicKey')}
                  options={[
                    'C',
                    'C#',
                    'D',
                    'D#',
                    'E',
                    'F',
                    'F#',
                    'G',
                    'G#',
                    'A',
                    'A#',
                    'B'
                  ]}
                />
                <SelectBox
                  label="Octave"
                  value={octave}
                  onChangeHandler={this.handleControlChanges('octave')}
                  options={[0, 1, 2, 3, 4, 5, 6, 7, 8]}
                />
              </div>
              <SelectBox
                label="Scale"
                value={scale}
                onChangeHandler={this.handleControlChanges('scale')}
                options={names()}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

const SelectBox = props => {
  const { label, value, onChangeHandler, options } = props;
  function onValueChange(e) {
    onChangeHandler && onChangeHandler(e.currentTarget.value);
  }
  return (
    <div className="filter">
      <span>{label}</span>
      <select value={value} onChange={onValueChange}>
        {options.map((option, index) => {
          if (typeof option == 'object') {
            return (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            );
          } else {
            return (
              <option key={index} value={option}>
                {option}
              </option>
            );
          }
        })}
      </select>
    </div>
  );
};
