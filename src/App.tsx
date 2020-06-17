import React, {useLayoutEffect, useRef } from 'react';
import './App.css';
import p5 from 'p5';
// import Snake from './Snake'
import sktch from './sketch'

function App() {
  let p5Canvas = useRef(null)
 
  useLayoutEffect(() => {
     new p5(sktch)
  }, [])

  return (
    <div className="App">
      <div id="game" ref={p5Canvas}></div>
    </div>
  );
}

export default App;
