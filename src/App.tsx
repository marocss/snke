import React, { useEffect } from 'react';
import firebase from 'firebase/app'
import 'firebase/analytics'
import 'firebase/auth'

//
import Routes from './routes'
import { AuthProvider } from './context/AuthContext'
import GlobalStyle from './styles/global'
//
import {
  BrowserRouter as Router,
} from "react-router-dom";

var firebaseConfig = {
  apiKey: process.env.REACT_APP_FIRE_API_KEY,
  authDomain: process.env.REACT_APP_FIRE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIRE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIRE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIRE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIRE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIRE_APP_ID,
  measurementId: process.env.REACT_APP_FIRE_MEASUREMENT_ID
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

const App: React.FC = () => { 
  useEffect(() => {
    firebase.app().auth().onAuthStateChanged(fireUser => {
      if (fireUser) {
        localStorage.setItem('@snke:id', fireUser.uid)
      } else {
        localStorage.setItem('@snke:id', 'none')
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <AuthProvider>
        <Router>
          <Routes />
        </Router>
      </AuthProvider>
      <GlobalStyle />
    </>
  )
}

export default App;
