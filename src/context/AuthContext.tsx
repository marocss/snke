import React, { createContext, useCallback, useState } from 'react'
import firebase from 'firebase/app'
import 'firebase/firestore'

interface AuthContextInterface {
  id: string;
  nickname: string;
  isLoading: boolean;
  hasError: boolean;
  login(nickname: string): Promise<void>;
}

async function validateNickname(nick: string) {
  if (nick === '' || nick.length > 16) return false
  
  let foundOne = false
  let querySnap = await firebase.firestore().collection('players').get()
  querySnap.forEach(doc => {
    if (doc.data().nickname === nick) {
      // console.log(`Found user matching\nnickname: ${nick} with id: ${doc.id}`)
      foundOne = true
    }
  })

  if(!foundOne) {
    return true
  }

  return false
}

export const AuthContext = createContext<AuthContextInterface>({} as AuthContextInterface)

export const AuthProvider: React.FC = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [hasError, setHasError] = useState(false)
  //
  const [data, setData] = useState(() => {
    let id = localStorage.getItem('@snke:id')

    if (id) return {id: id}

    return {id: 'none'}
  })


  const login = useCallback(async (nickname) => {
    setIsLoading(true)
    // console.log(`starting login for: ${nickname}`)
    let nicknameValid = await validateNickname(nickname)
    if (!nicknameValid) {
      setIsLoading(false)
      setHasError(true)
      return
    }
    // console.log(`nick valid: ${nicknameValid}`)

    // sign in anonymously with firebase
    const userCredential = await firebase.auth().signInAnonymously()
    // console.log(`user: ${JSON.stringify(userCredential.user)}`)
    if (userCredential.user) {
      localStorage.setItem('@snke:id', userCredential.user.uid)
      setData({id: userCredential.user.uid})
    }

    // create db record
    let exists = false
    const x = await firebase.firestore().collection('players').get()
    x.docs.forEach(doc => {
      if (doc.id === userCredential.user?.uid) {
        exists = true
      }
    })
    const user = {
      id: userCredential.user?.uid,
      nickname,
      createdAt: firebase.firestore.Timestamp.now(),
      updatedAt: firebase.firestore.Timestamp.now(),
      games: []
    }
    if (!exists) {
      await firebase.firestore().collection('players').doc(`${user.id}`).set(user)
    }
    setIsLoading(false)
  }, [])

  
  return (
    <AuthContext.Provider value={{ id: data.id, nickname: '', isLoading: isLoading, hasError: hasError, login}}>
      {children}
    </AuthContext.Provider>
  )
}