import React from 'react';
import { Link } from "react-router-dom";

import { Container } from './styles';

function Navbar() {
  return (
    <Container>
      <Link to="/">
        <div>
            <span role="img" aria-label="logo">
              🐍
            </span>
        </div>
      </Link>
      <Link to="/ranking">
        <div>
          Ranking
        </div>
      </Link>
    </Container>
  )
}

export default Navbar;