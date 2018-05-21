import React, { Component } from 'react';
import './App.css';
import Grid from './components/Grid';
import {range} from './utils';

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
    const cellInfo = [
      {
        type: 'numbers'
      },
      {
        type: 'icons',
        iconsArray: range(9833,9843).map(val=>`&#${val};`)
      },
      {
        type: 'music',
        notesArray:[130.8, 146.8, 164.8, 174.6, 196.0, 220.0, 246.9, 261.6, 0],
        notationsArray:['C', 'D', 'E', 'F', 'G', 'A', 'B', "C'", 'X'],
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
