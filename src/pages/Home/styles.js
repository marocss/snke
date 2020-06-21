import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  flex-direction: column;
  background: #2F2F2F;
  align-items: center;

  canvas {
    margin-top: 10px;
    border: 2px solid red;
  }
`;
