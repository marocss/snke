import React, {useEffect, useRef, useState} from 'react';
import './App.css';
import p5 from 'p5';
import Snake from './Snake'

let s: Snake;
let scl = 20;
let food: { x: any; y: any; mult: (arg0: number) => void; };

function App() {
  const [width, ] = useState((window.innerWidth) - (window.innerWidth % 20))
  const [height, ] = useState(window.innerHeight - (window.innerHeight % 20))

  let p5Canvas = useRef(null)

  useEffect(() => {
    console.log(width, height)

    new p5( p => {      
      p.setup = () => {
        p.createCanvas(width, height).parent(p5Canvas.current)
        s = new Snake(p, scl, width, height);
        p.frameRate(10);
        pickLocation();
      };
      
      p.draw = () => {
        p.background(65);
        if (s.eat(food)) {
          pickLocation();
        }
        s.death();
        s.update();
        s.show();
        p.fill(0, 255, 100);
        p.rect(food.x, food.y, scl, scl);
      };

      p.keyPressed = (event: KeyboardEvent) => {
        if (event.key === 'ArrowUp') {
          s.dir(0, -1);
        } else if (event.key === 'ArrowDown') {
          s.dir(0, 1);
        } else if (event.key === 'ArrowRight') {
          s.dir(1, 0);
        } else if (event.key === 'ArrowLeft') {
          s.dir(-1, 0);
        }
      }

      function pickLocation() {
        let cols = p.floor(width / scl);
        let rows = p.floor(height / scl);
        // console.log(p.random(cols), rows)
        food = p.createVector(p.floor(p.random(cols)), p.floor(p.random(rows)));
        // console.log(food)
        food.mult(scl);
        // console.log(food.mult(scl))
        
      }
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="App">
      <div className="Game" ref={p5Canvas}></div>
    </div>
  );
}

export default App;
