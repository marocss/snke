import React from 'react';
import Game from '../../components/Game';
import { Container } from './styles';

import Navbar from '../../components/Navbar'

const Home = () => {
  return (
    <Container>
      <Navbar />
      <Game />
    </Container>
  )
}

export default Home;