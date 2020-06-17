// import p5 from 'p5';
import Snake from './Snake'


function ontouch(el, callback){
  var touchsurface = el,
  dir,
  swipeType,
  startX,
  startY,
  distX,
  distY,
  threshold = 150, //required min distance traveled to be considered swipe
  restraint = 100, // maximum distance allowed at the same time in perpendicular direction
  allowedTime = 500, // maximum time allowed to travel that distance
  elapsedTime,
  startTime,
  handletouch = callback || function(evt, dir, phase, swipetype, distance){}

  touchsurface.addEventListener('touchstart', function(e){
      var touchobj = e.changedTouches[0]
      dir = 'none'
      swipeType = 'none'
      // let dist = 0
      startX = touchobj.pageX
      startY = touchobj.pageY
      startTime = new Date().getTime() // record time when finger first makes contact with surface
      handletouch(e, 'none', 'start', swipeType, 0) // fire callback function with params dir="none", phase="start", swipetype="none" etc
      e.preventDefault()

  }, false)

  touchsurface.addEventListener('touchmove', function(e){
      var touchobj = e.changedTouches[0]
      distX = touchobj.pageX - startX // get horizontal dist traveled by finger while in contact with surface
      distY = touchobj.pageY - startY // get vertical dist traveled by finger while in contact with surface
      if (Math.abs(distX) > Math.abs(distY)){ // if distance traveled horizontally is greater than vertically, consider this a horizontal movement
          dir = (distX < 0)? 'left' : 'right'
          handletouch(e, dir, 'move', swipeType, distX) // fire callback function with params dir="left|right", phase="move", swipetype="none" etc
      }
      else{ // else consider this a vertical movement
          dir = (distY < 0)? 'up' : 'down'
          handletouch(e, dir, 'move', swipeType, distY) // fire callback function with params dir="up|down", phase="move", swipetype="none" etc
      }
      e.preventDefault() // prevent scrolling when inside DIV
  }, false)

  touchsurface.addEventListener('touchend', function(e){
      // var touchobj = e.changedTouches[0]
      elapsedTime = new Date().getTime() - startTime // get time elapsed
      if (elapsedTime <= allowedTime){ // first condition for awipe met
          if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){ // 2nd condition for horizontal swipe met
              swipeType = dir // set swipeType to either "left" or "right"
          }
          else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint){ // 2nd condition for vertical swipe met
              swipeType = dir // set swipeType to either "top" or "down"
          }
      }
      // Fire callback function with params dir="left|right|up|down", phase="end", swipetype=dir etc:
      handletouch(e, dir, 'end', swipeType, (dir ==='left' || dir ==='right')? distX : distY)
      e.preventDefault()
  }, false)
}


const sktch = (sketch) => {      
  let s
  const width = (window.innerWidth - 10) - ((window.innerWidth - 10) % 20)
  const height = (window.innerHeight - 10) - ((window.innerHeight - 10) % 20)
  const scl = 20;
  let food


  sketch.setup = () => {
    sketch.createCanvas(width, height).parent('game')
    sketch.frameRate(10);

    s = new Snake(sketch, scl, width, height);
    
    pickLocation();
  };
  
  sketch.draw = () => {
    sketch.background(65);

    if (s.eat(food)) {
      pickLocation();
    }

    s.death();
    s.update();
    s.show();

    sketch.fill(0, 255, 100);
    sketch.rect(food.x, food.y, scl, scl);
  };

  sketch.keyPressed = (event) => {
    console.log(event)
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

  const pickLocation = () => {
    let cols = sketch.floor(width / scl);
    let rows = sketch.floor(height / scl);

    food = sketch.createVector(
      sketch.floor(sketch.random(cols)), 
      sketch.floor(sketch.random(rows))
    );

    food.mult(scl);
    // console.log(food.mult(scl))
  }

  const moveOnSwipe = (direction) => {
    if (direction === 'up') {
      s.dir(0, -1);
    } else if (direction === 'down') {
      s.dir(0, 1);
    } else if (direction === 'right') {
      s.dir(1, 0);
    } else if (direction === 'left') {
      s.dir(-1, 0);
    }
  }

  window.addEventListener('load', function() {
      var el = document.getElementsByTagName('body')[0]
      ontouch(el, function(evt, dir, phase, swipetype, distance){
        // alert(dir)
        moveOnSwipe(dir)
        // switch (dir) {
        //   case 'up':
        //     // alert('up')
        //     break;
        //   case 'down':
        //     alert('down')
        //     break;
        //   case 'left':
        //     alert('left')
        //     break;
        //   case 'right':
        //     alert('right')
        //     break;
        
        //   default:
        //     break;
        // }
      })
  })
}

export default sktch