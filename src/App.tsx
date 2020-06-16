import React, {useEffect, useRef} from 'react';
import './App.css';
import p5 from 'p5';
import Snake from './Snake'

let s: Snake;
let scl = 20;
let food: { x: any; y: any; mult: (arg0: number) => void; };

function App() {
  let p5Canvas = useRef(null)

  useEffect(() => {
    new p5( p => {      
      p.setup = () => {
        p.createCanvas(600, 600);
        s = new Snake(p, scl);
        p.frameRate(10);
        pickLocation();
      };
      
      p.draw = () => {
        p.background(51);
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
        let cols = p.floor(600 / scl);
        let rows = p.floor(600 / scl);
        food = p.createVector(p.floor(p.random(cols)), p.floor(p.random(rows)));
        food.mult(scl);
      }
    })
  }, [])

  return (
    <div className="App">
      <div ref={p5Canvas} />
    </div>
  );
}

export default App;
