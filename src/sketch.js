import Snake from './gameComponents/Snake'
import Food from './gameComponents/Food'
import onTouch from './utils/onTouch'


const sktch = sketch => {      
  let snake
  const squareSize = 20
  let food

  const width = (window.innerWidth - 10) - ((window.innerWidth - 10) % squareSize)
  const height = (window.innerHeight - 10) - ((window.innerHeight - 10) % squareSize)


  sketch.setup = () => {
    sketch.createCanvas(width, height).parent('game')
    sketch.frameRate(10)

    snake = new Snake(sketch, width, height, squareSize)
    food = new Food(sketch, width, height, squareSize)
    
    food.create()
  }
  
  sketch.draw = () => {
    sketch.background(65)

    if (snake.eat(food)) {
      food.create()
    }

    food.show()

    snake.update()
    snake.show()
    snake.death()
  }

  sketch.keyPressed = (event) => {
    switch (event.key) {
      case 'ArrowUp':
        snake.move(0, -1)
        break

      case 'ArrowDown':
        snake.move(0, 1)
        break

      case 'ArrowRight':
        snake.move(1, 0)
        break

      case 'ArrowLeft':
        snake.move(-1, 0)
        break

      default:
        break
    }
  }

  const moveOnSwipe = (direction) => {
    switch (direction) {
      case 'up':
        snake.move(0, -1)
        break

      case 'down':
        snake.move(0, 1)
        break

      case 'right':
        snake.move(1, 0)
        break

      case 'left':
        snake.move(-1, 0)
        break

      default:
        break
    }
  }

  window.addEventListener('load', function() {
      var gameWindow = document.getElementById('game')
      onTouch(gameWindow, function(dir){
        moveOnSwipe(dir)
      })
  })
}

export default sktch