import React, {useEffect, useState} from 'react';
import firebase from 'firebase/app'
import 'firebase/firestore'

import { useHistory } from "react-router-dom";

import Navbar from '../../components/Navbar'

import { Container, Content, RankCard } from './styles';


const Ranking = () => {
  const [allScores, setAllScores] = useState(null)

  let history = useHistory()

  useEffect(() => {
    (async () => {
      let querySnap = await firebase.firestore().collection('players').get()
      let usersAndScores = []
      querySnap.forEach(doc => {
        let userScores = []
        // eslint-disable-next-line array-callback-return
        doc.data().games.map(game => {
          userScores.push(game.score)
        })
        let userHighestScore = Math.max(...userScores)
        if (userHighestScore === -Infinity) {
          userHighestScore = 0
        }

        let user = {
          // id: doc.id,
          nickname: doc.data().nickname,
          // scores: userScores,
          highestScore: userHighestScore
        }
        usersAndScores.push(user)
      })

      function compare( a, b ) {
        if ( a.highestScore < b.highestScore ){
          return -1;
        }
        if ( a.highestScore > b.highestScore ){
          return 1;
        }
        return 0;
      }
      
      let z = usersAndScores.sort(compare).reverse()
      z = z.slice(0, 5)
      setAllScores(z)
    })()


  }, [])

  function handleBackBtn() {
    history.push('/')

  }

  let cardsColors = ['#F5E892', '#EAE5E5', '#EFCB97', '#B9B9B9',' #B9B9B9']
  return (
    <Container>
      <Navbar />
      <Content>
      <h1>Ranking</h1>
      {allScores && allScores.map((data, index) => (
        <RankCard key={data.nickname} style={{display: 'flex', background: cardsColors[index]}}>
          <div>
            <p>{index + 1}º</p>
            <h1>{data.nickname}</h1>
          </div>
          <p>{data.highestScore} pts</p>
        </RankCard>
      ))}
      <button onClick={handleBackBtn}>go back</button>
      </Content>
    </Container>
  )
}

export default Ranking;