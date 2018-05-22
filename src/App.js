import React, { Component } from 'react';
import './App.css';
import Grid from './components/Grid';
import { range } from './utils';
import { notes } from 'tonal-scale';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {size: 3, gridType: 'numbers'};
  }
  render() {
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

    const cellInfo = function(type, size) {
      let gridSize = size * size;
      if (type === 'numbers') {
        return {
          type: 'numbers',
          dataArray: range(1, gridSize + 1)
        };
      } else if (type === 'icons') {
        var startIndex = 9833;
        return {
          type: 'icons',
          dataArray: range(startIndex, startIndex + gridSize + 1).map(val => `&#${val};`)
        };
      } else {
        let scaleIndex = 2;
        let key = 'C';
        let scale = 'pentatonic';
        let notesArray = [];
        while (notesArray.length < gridSize) {
          notesArray = notesArray.concat(notes(`${key}${scaleIndex++} ${scale}`));
        }
        notesArray = notesArray.slice(0, gridSize);
        return {
          type: 'music',
          dataArray: notesArray,
          exposeFixed: true,
          exposeSelected: true
        };
      }
    };

    return (
      <div className="App">
        <Grid
          size={3}
          cellSize={50}
          inputData={inputData}
          cellInfo={cellInfo('music',3)}
          feedback={true}
        />
      </div>
    );
  }
}

export default App;
