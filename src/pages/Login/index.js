import React, { useState, useContext } from 'react';
// import firebase from 'firebase/app'
// import 'firebase/auth'
// import 'firebase/firestore'
//
import { AuthContext } from '../../context/AuthContext'
//
import {Redirect} from 'react-router-dom'

import Navbar from '../../components/Navbar'

import { Container, Content, Form } from './styles';

const Login = () => {
  const [input, setInput] = useState('')
  // const [isLoading, setIsLoading] = useState(false)
  // const [hasError, setHasError] = useState(false)
  //
  const { login, id, isLoading, hasError } = useContext(AuthContext)
  //
  // console.log(`id: ${id}`)
  //
  // let history = useHistory();
  // let location = useLocation();
  
  // const { fakeAuth, user } = props
  
  // let { from } = location.state || { from: { pathname: "/game" } };

  // let login = () => {
  //   fakeAuth.authenticate(() => {
  //     history.replace(from);
  //   });
  // };

  // console.log(user)
  // async function isNickValid(nick) {
  //   if (nick === '' || nick.length > 16) {
  //     canCreate = false
  //     return
  //   }

  //   let querySnap = await firebase.firestore().collection('players').get()
    
  //   querySnap.forEach(doc => {
  //     // console.log((doc.data().nickname)) 
  //     if (doc.data().nickname === nick) {
  //       console.log('found one')
  //       canCreate = false
  //       return 
  //     }
  //   })
  // }


  // const handleLogin = async (e) => {
  //   e.preventDefault()
  //   setIsLoading(true)
  //   await isNickValid(nickname)
  //   // setHasError(true)
  //   if (canCreate) {
  //     try {
  //       const userCredential = await firebase.auth().signInAnonymously()
  //       console.log('userCredential: ', userCredential)
        
  //       const user = {
  //         id: userCredential.user.uid,
  //         nickname,
  //         createdAt: firebase.firestore.Timestamp.now(),
  //         updatedAt: firebase.firestore.Timestamp.now(),
  //         games: []
  //       }
        
  //       // check if user exists before adding to firestore
  //       let exists = false
  //       const x = await firebase.firestore().collection('players').get()
  //       x.docs.forEach(doc => {
  //         if (doc.data().id === user.id) {
  //           exists = true
  //         }
  //       })
        
  //       if (!exists) {
  //         await firebase.firestore().collection('players').doc(`${user.id}`).set(user)
  //       }

  //       setIsLoading(false)
        
  //       login()
        
        
  //     } catch (error) {
  //       setHasError(true)
  //       setIsLoading(false)
  //     }
  //   } else {
  //     setHasError(true)
  //     setIsLoading(false)
  //     canCreate = true
  //   }
  // }

  return (
    <Container>
      <Navbar />
        <Content>
          <h1><span role="img" aria-label="logo">🐍</span></h1>
          <h1>snke</h1>
          {id && id === 'none' ? (
          <Form isLoading={isLoading} hasError={hasError}>
            <label>Enter a nickname: </label>
            {hasError && <p>Invalid nickname.</p>}
            <input 
              type="text" 
              placeholder="Nickname" 
              autoComplete="off" 
              autoCorrect="off" 
              autoCapitalize="off" 
              spellCheck="false"              
              maxLength={16}
              minLength={2}
              value={input}
              onChange={e => setInput(e.target.value)}
            />
            <button disabled={isLoading ? true : false} onClick={() => login(input)}>{isLoading ? 'loading...' : 'PLAY'}</button>
          </Form> ) : <Redirect to="/game" /> }
        </Content>
      </Container>
  )
}

export default Login;