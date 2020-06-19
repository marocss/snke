import React, { useState, useLayoutEffect, useEffect } from 'react';
import p5 from 'p5';
import Game from '../../game/Game'

interface Stopwatch {
  timerOn: boolean;
  timerTime: number;
  timerStart: number;
}

let timer: any

const GameComponent: React.FC = () => { 
  const [total, setTotal] = useState(0)
  const [stopwatch, setStopwatch] = useState<Stopwatch>({
    timerOn: false,
    timerTime: 0,
    timerStart: 0
  })
  const [isDead, setIsDead] = useState(false)

  const { timerTime } = stopwatch;
  let centiseconds = ("0" + (Math.floor(timerTime / 10) % 100)).slice(-2);
  let seconds = ("0" + (Math.floor(timerTime / 1000) % 60)).slice(-2);
  let minutes = ("0" + (Math.floor(timerTime / 60000) % 60)).slice(-2);
  // let hours = ("0" + Math.floor(timerTime / 3600000)).slice(-2);

  useEffect(() => {
    if(isDead) {
      // TODO: disparar toast
      alert(`Você morreu!\nPontos: ${total}\nTempo: ${minutes}:${seconds}:${centiseconds}`)
      setIsDead(false)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDead])
  
  useLayoutEffect(() => {
    const myp5 = new p5((sketch: p5) => {      
      const squareSize = 20
      const borderSize = 10
      let game: Game
    
      const width = (window.innerWidth - borderSize) - ((window.innerWidth - borderSize) % squareSize)
      const height = (window.innerHeight - borderSize) - ((window.innerHeight - borderSize) % squareSize)
    
    
      sketch.setup = () => {
        game = new Game(sketch, width, height, squareSize, total, setTotal, stopwatch, startTimer, stopAndResetTimer, setIsDead)
    
        game.start()
        game.show()
      }
      
      sketch.draw = () => {
        sketch.background(65)

        game.update()
        game.show()
      }
    })

    return myp5.remove()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  const startTimer = () => {
    setStopwatch(previousState => ({
      timerOn: true,
      timerTime: previousState.timerTime,
      timerStart: Date.now() - previousState.timerTime
    }))

    timer = setInterval(() => {
      setStopwatch(previousState => ({
        timerOn: previousState.timerOn,
        timerTime: Number(Date.now() - previousState.timerStart),
        timerStart: previousState.timerStart
      }))
    }, 10)
  }

  const stopAndResetTimer = () => {
    setStopwatch({  timerOn: false, timerStart: 0, timerTime: 0 });
    clearInterval(timer);
  };


  return (
    <>
      <p style={{position: 'absolute', top: 20, right: 25, color: 'rgba(255, 255, 255, 0.4)', fontSize: '0.8rem', fontFamily: 'Arial', fontWeight: 'bold' }}>{minutes + ':' + seconds + ':' + centiseconds}</p>
      <p style={{position: 'absolute', top: 20, left: 25, color: 'rgba(255, 255, 255, 0.4)', fontSize: '1.3rem', fontFamily: 'Arial', fontWeight: 'bold' }}>{total}</p>
      <div id="game">
      </div>
    </>
  )
}

export default GameComponent;
