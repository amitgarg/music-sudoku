import React, { Component } from 'react';
import './App.css';
import Grid from './components/Grid';
import ControlBox from './components/ControlBox';
import Pallette from './components/Pallette';
import { range } from './utils';
import { notes } from 'tonal-scale';
import { simplify } from 'tonal-note';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      size: 3,
      cellType: 'music',
      feedback: true,
      musicKey: 'C',
      octave: 3,
      scale: 'major'
    };
    this.handleControlChange = this.handleControlChange.bind(this);
  }

  handleControlChange(data) {
    let newState = {};
    for (var key in this.state) {
      newState[key] = data.hasOwnProperty(key) ? data[key] : this.state[key];
    }
    this.setState(newState);
  }
  render() {
    const { size, cellType, feedback, musicKey, octave, scale } = this.state;

    const inputData = [
      [4, 5, , 8, 6, 3, , ,],
      [7, , 9, , 5, , , , 3],
      [8, , , , 2, , 4, ,],
      [, , , 2, , , 9, 3],
      [, , 7, 1, 4, 6, 5, ,],
      [, 8, 6, , , 5, , ,],
      [, , 4, , 8, , , , 2],
      [2, , , , 1, , 6, , 8],
      [, , , 6, 9, 2, , 1, 4]
    ];

    const cellInfo = function() {
      let gridSize = size * size;
      if (cellType === 'numbers') {
        return {
          type: 'numbers',
          dataArray: range(1, gridSize + 1)
        };
      } else if (cellType === 'icons') {
        var startIndex = 9833;
        return {
          type: 'icons',
          dataArray: range(startIndex, startIndex + gridSize + 1).map(val => `&#${val};`)
        };
      } else {
        let notesArray = [];
        let octaveVar = octave;
        while (notesArray.length < gridSize) {
          notesArray = notesArray.concat(notes(`${musicKey}${octaveVar++} ${scale}`));
        }
        notesArray = notesArray.slice(0, gridSize).map(simplify);
        return {
          type: 'music',
          dataArray: notesArray,
          exposeFixed: false,
          exposeSelected: true
        };
      }
    };

    return (
      <div className="App">
        <ControlBox
          size={size}
          cellType={cellType}
          feedback={feedback}
          musicKey={musicKey}
          scale={scale}
          octave={octave}
          handleControlChange={this.handleControlChange}
        />
        <Pallette cellSize={50} cellInfo={cellInfo()} />
        <Grid
          size={size}
          cellSize={50}
          inputData={inputData}
          cellInfo={cellInfo()}
          feedback={feedback}
        />
      </div>
    );
  }
}

export default App;
