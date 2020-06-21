import React, { useState, useEffect, useRef, useContext } from 'react';
import p5 from 'p5';
import Game from '../../game/Game'
import firebase from 'firebase/app'
import 'firebase/firestore'
import { AuthContext } from '../../context/AuthContext';

interface Stopwatch {
  timerOn: boolean;
  timerTime: number;
  timerStart: number;
}

let timer: any

interface GameProps {
  user: {
    id: string
  },
  setUser: React.Dispatch<React.SetStateAction<string>>
}


const GameComponent: React.FC<GameProps> = () => { 
  const { id } = useContext(AuthContext)

  const [total, setTotal] = useState(0)
  const [stopwatch, setStopwatch] = useState<Stopwatch>({
    timerOn: false,
    timerTime: 0,
    timerStart: 0
  })
  const [isDead, setIsDead] = useState(false)

  const gameRef = useRef<HTMLDivElement>(null)

  const { timerTime } = stopwatch;
  let centiseconds = ("0" + (Math.floor(timerTime / 10) % 100)).slice(-2);
  let seconds = ("0" + (Math.floor(timerTime / 1000) % 60)).slice(-2);
  let minutes = ("0" + (Math.floor(timerTime / 60000) % 60)).slice(-2);
  // let hours = ("0" + Math.floor(timerTime / 3600000)).slice(-2);

  const s = (sketch: p5) => {
    const squareSize = 20
    const borderSize = 10
    let game: Game
  
    const width = (window.innerWidth - (borderSize + 10)) - ((window.innerWidth - (borderSize + 10)) % squareSize)
    const height = (window.innerHeight - (borderSize + 40)) - ((window.innerHeight - (borderSize + 40)) % squareSize)
    
    
    sketch.setup = () => {
      game = new Game(sketch, width, height, squareSize, total, setTotal, stopwatch, startTimer, stopAndResetTimer, setIsDead, gameRef)
  
      // console.log(`starting game ${minutes + ':' + seconds + ':' + centiseconds}`);
      game.start()
      
      game.show()
    }
    
    sketch.draw = () => {
      sketch.background(65)
      let fps = sketch.frameRate();
      sketch.fill(200);
      sketch.stroke(0);
      sketch.text("FPS: " + fps.toFixed(2), 10, height - 10);
      sketch.textSize(9)

      game.update()
      game.show()
    }
  }

  useEffect(() => {
    if(isDead) {
      const { timerTime } = stopwatch;
      // update games
      (async () => {
        await firebase.firestore().doc(`players/${id}`).update({
          games: firebase.firestore.FieldValue.arrayUnion({
            score: total,
            time: timerTime
          }),
          updatedAt: firebase.firestore.Timestamp.now()
        })
      })()

      alert(`Você morreu!\n    Pontos: ${total}\n    Tempo: ${minutes + ':' + seconds + ':' + centiseconds}`)
      setIsDead(false)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDead])


  useEffect(() => {
    if (gameRef.current) {
      new p5(s, gameRef.current)
    }
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
    <div>
      <p style={{position: 'absolute', top: 55, right: 32, color: 'rgba(255, 255, 255, 0.4)', fontSize: '0.8rem', fontFamily: 'Arial', fontWeight: 'bold' }}>{minutes + ':' + seconds + ':' + centiseconds}</p>
      <p style={{position: 'absolute', top: 55, left: 32, color: 'rgba(255, 255, 255, 0.4)', fontSize: '1.3rem', fontFamily: 'Arial', fontWeight: 'bold' }}>{total}</p>
      <div ref={gameRef}/>
    </div>
  )
}

export default GameComponent;
