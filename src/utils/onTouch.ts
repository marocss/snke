export default function onTouch(element: HTMLElement | null, callback: Function){
  let touchsurface = element,
  dir,
  startX: number,
  startY: number,
  distX,
  distY,
  handletouch = callback || function(dir: string){}

  if (touchsurface) {
    touchsurface.addEventListener('touchstart', function(e){
      let touchobj = e.changedTouches[0]
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
  }
}
