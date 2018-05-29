import React, { Component } from 'react';
import './App.css';
import Grid from './components/Grid';
import ControlBox from './components/ControlBox';
import { range } from './utils';
import { notes } from 'tonal-scale';
import { simplify } from 'tonal-note';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      size: 3,
      cellType: 'colors',
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
        // var startIndex = 9833;
        let startIndex = 4096;
        return {
          type: 'icons',
          dataArray: range(startIndex, startIndex + gridSize + 1).map(val => `&#${val};`)
        };
      } else if (cellType === 'colors') {
        // var startIndex = 9833;
        let startIndex = 0;
        var colorArray = size <3 ? [
            '#000099',
            '#0000FF',
            '#990000',
            '#FF0000'
          ]: size< 4 ? [
            '#000099',
            '#0000BB',
            '#0000FF',
            '#009900',
            '#00BB00',
            '#00FF00',
            '#990000',
            '#BB0000',
            '#FF0000'
          ] : [
            '#000077',
            '#000099',
            '#0000CC',
            '#0000FF',
            '#007700',
            '#009900',
            '#00CC00',
            '#00FF00',
            '#770000',
            '#990000',
            '#CC0000',
            '#FF0000',
            '#227777',
            '#229999',
            '#22CCCC',
            '#22FFFF'
          ]
                return {
          type: 'colors',
          dataArray: colorArray
          // dataArray: range(startIndex, startIndex + gridSize + 1).map(val => `&#${val};`)
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

    let feedbackBoolean = feedback == 'true';
    let windowWidth = window.innerWidth;
    let padding = 0;
    if (windowWidth < 320) {
      padding = 0;
    } else if (windowWidth < 480) {
      padding = 3;
    } else if (windowWidth < 680) {
      padding = 5;
    } else if (windowWidth < 767) {
      padding = 10;
    } else {
      padding = 20;
    }

    let cellSize = (window.innerWidth - 2 * padding - 5 * size) / (size * size);
    cellSize = cellSize > 50 ? 50 : cellSize;
    const blockSize = size * cellSize + 5;
    const gridSize = size * blockSize;
    return (
      <div className="App" style={{ padding: `5px ${padding}px` }}>
        <ControlBox
          size={size}
          cellSize={cellSize}
          gridSize={gridSize}
          cellType={cellType}
          feedback={feedbackBoolean}
          musicKey={musicKey}
          scale={scale}
          octave={octave}
          handleControlChange={this.handleControlChange}
        />
        <Grid
          size={size}
          cellSize={cellSize}
          blockSize={blockSize}
          gridSize={gridSize}
          inputData={inputData}
          cellInfo={cellInfo()}
          feedback={feedbackBoolean}
        />
      </div>
    );
  }
}

export default App;
