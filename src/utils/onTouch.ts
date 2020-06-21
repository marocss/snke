export default function onTouch(element: HTMLElement | null, callback: Function){
  let touchsurface = element
  let dir: string
  let startX: number
  let startY: number
  let distX: number
  let distY: number
  let handletouch = callback || function(dir: string){}
  let threshold = 1 //required min distance traveled to be considered swipe
  let swipeType: string
  let restraint = 300 // maximum distance allowed at the same time in perpendicular direction
  let allowedTime = 200 // maximum time allowed to travel that distance
  let elapsedTime: number
  let startTime: number


  if (touchsurface) {
    touchsurface.addEventListener('touchstart', function(e){
      let touchobj = e.changedTouches[0]
      dir = 'none'
      swipeType = 'none'
      startTime = new Date().getTime() // record time when finger first makes contact with surface
      startY = touchobj.pageY
      startX = touchobj.pageX

      e.preventDefault()
    }, false)

    touchsurface.addEventListener('touchmove', function(e){
        let touchobj = e.changedTouches[0]
        distX = touchobj.pageX - startX 
        distY = touchobj.pageY - startY 
      
        if (Math.abs(distX) > Math.abs(distY)){ 
            dir = (distX < 0)? 'a' : 'd'
            handletouch(dir) 
        } else { 
            dir = (distY < 0)? 'w' : 's'
            handletouch(dir) 
        }
        
        e.preventDefault() 
    }, false)

    touchsurface.addEventListener('touchend', function(e){
      // ;let touchobj = e.changedTouches[0]
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
//       handletouch(e, dir, 'end', swipeType, (dir === 'left' || dir === 'right')? distX : distY)
      handletouch(swipeType)
      e.preventDefault()
    }, false)
  }
}
