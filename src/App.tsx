import React, {useLayoutEffect } from 'react';
import p5 from 'p5';
import sketch from './sketch'

import './App.css';

function App() {
 
  useLayoutEffect(() => {
    new p5(sketch)
  }, [])

  return (
    <div className="App">
      <div id="game"></div>
    </div>
  )
}

export default App;
