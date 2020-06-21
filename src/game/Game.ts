import React from 'react'
import Snake from './Snake'
import Food from './Food'
import onTouch from '../utils/onTouch'
import p5 from 'p5'

interface Stopwatch {
  timerOn: boolean;
  timerTime: number;
  timerStart: number;
}

export default class Game {
  sketch: p5
  width: number
  height: number
  squareSize: number
  snake: Snake
  food: Food
  total: number
  setTotalFood: React.Dispatch<React.SetStateAction<number>>
  stopAndResetTimer: Function
  startTimer: Function
  stopwatch: Stopwatch
  setIsDead: React.Dispatch<React.SetStateAction<boolean>>
  gameRef: React.RefObject<HTMLDivElement>

  constructor(sketch: p5,
    width: number, 
    height: number, 
    squareSize: number, 
    total: number, 
    setTotal: React.Dispatch<React.SetStateAction<number>>, 
    stopwatch: Stopwatch, 
    startTimer: Function, 
    stopAndResetTimer: Function, 
    isDead: React.Dispatch<React.SetStateAction<boolean>>,
    gameRef: React.RefObject<HTMLDivElement>

    ) {
      this.sketch = sketch
      this.width = width
      this.height = height
      this.squareSize = squareSize
      this.snake = new Snake(sketch, width, height, squareSize)
      this.food = new Food(sketch, width, height, squareSize)
      this.total = total
      this.setTotalFood = setTotal
      this.stopAndResetTimer = stopAndResetTimer
      this.startTimer = startTimer
      this.stopwatch = stopwatch
      this.setIsDead = isDead
      this.gameRef = gameRef
  }

  public start(): void {
    this.sketch.createCanvas(this.width, this.height)
    this.sketch.frameRate(10)

    this.listenForInputs()
    this.startTimer()

    this.food.create()
  }

  public update(): void {
    this.snake.update(this.total, this.food)

    if (this.snake.ate) {
      this.total++
      this.setTotalFood((prevState: number)=> (prevState + 1))
      this.food.updateColor()
      this.food.create()
      this.snake.ate = false
    }
    
    if(this.snake.died) {
      this.setIsDead(true)
      this.setTotalFood(0)
      this.stopAndResetTimer()
      this.startTimer()
      this.total = 0
      this.snake.died = false
    }
  }
  
  public show(): void {
    this.food.show()
    this.snake.show()
  }

  private listenForInputs(): void {
    // keys
    this.sketch.keyPressed = () => { 
      this.handleInput(this.sketch.key)   
    }

    // swipes
    onTouch(this.gameRef.current, (direction: string) => {
      this.handleInput(direction)
    })
  }

  private handleInput(input: string): void {
    switch (input) {
      case 'ArrowUp':
      case 'w':
        this.snake.move(0, -1)

        break
      case 'ArrowDown':
      case 's':
        this.snake.move(0, 1)

        break
      case 'ArrowRight':
      case 'd':
        this.snake.move(1, 0)

        break
      case 'ArrowLeft':
      case 'a':
        this.snake.move(-1, 0)
 
        break
      default:
        break
    }
  }
}