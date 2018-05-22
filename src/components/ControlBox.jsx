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
    const { size, cellType, feedback, musicKey, scale, octave } = this.props;
    return (
      <div className="ControlBox">
        <SelectBox
          label="Size"
          value={size}
          onChangeHandler={this.handleControlChanges('size')}
          options={[2, 3, 4]}
        />
        <SelectBox
          label="Cell Type"
          value={cellType}
          onChangeHandler={this.handleControlChanges('cellType')}
          options={['numbers', 'icons', 'music']}
        />
        <SelectBox
          label="Feedback Enabled"
          value={feedback}
          onChangeHandler={this.handleControlChanges('feedback')}
          options={[{ label: 'Yes', value: true }, { label: 'No', value: false }]}
        />
        {cellType === 'music' && 
        <div>
        <SelectBox
          label="Music Key"
          value={musicKey}
          onChangeHandler={this.handleControlChanges('musicKey')}
          options={['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']}
        />
        <SelectBox
          label="Scale"
          value={scale}
          onChangeHandler={this.handleControlChanges('scale')}
          options={names()}
        />
        <SelectBox
          label="Octave"
          value={octave}
          onChangeHandler={this.handleControlChanges('octave')}
          options={[0, 1, 2, 3, 4, 5, 6, 7, 8]}
        />
        </div>}
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
