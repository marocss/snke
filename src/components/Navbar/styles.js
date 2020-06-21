import styled from 'styled-components';

export const Container = styled.div`
  display: block;
  display: flex;
  height: 35px;
  width: 100vw;
  align-items: center;
  padding: 0 16px;
  background: #1D1D1D;
  justify-content: space-between;

  a {
    color: #acaea6;
    &:hover {
      color: #fff
    }
  }

  div {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    height: 31px;
    padding: 0 16px;
    background: #1d1d1d;        
    &:hover {
      background: #575757;
    } 
  }
`;
