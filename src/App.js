import React, { Component } from 'react';
import './App.css';
import Grid from './components/Grid';
import {range} from './utils';
import {notes} from 'tonal-scale';

class App extends Component {
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
    var scaleIndex = 3;
    var gridSize = 9;
    var length = 0;
    var notesArray = notes(`C${scaleIndex++} major`);
    while(notesArray.length < gridSize){
      notesArray = notesArray.concat(notes(`D${scaleIndex++} pentatonic`))
    }
    notesArray = notesArray.slice(0,gridSize);
    const cellInfo = [
      {
        type: 'numbers',
        dataArray: range(1,10)
      },
      {
        type: 'icons',
        dataArray: range(9833,9843).map(val=>`&#${val};`)
      },
      {
        type: 'music',
        dataArray:notesArray,
        exposeFixed : false,
        exposeSelected : true
      }
    ];
    return (
      <div className="App">
        <Grid size={3} cellSize={50} inputData={inputData} cellInfo={cellInfo[2]} feedback={true} />
        
      </div>
    );
  }
}

export default App;
