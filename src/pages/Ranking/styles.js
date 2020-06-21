import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  background: #2F2F2F;

`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  background: #2F2F2F;
  align-items: center;

  h1 {
    color: #fff;
    margin-top: 32px;
  }

  button {
    width: 200px;
    height: 40px;
    color: #ccc;
    border-radius: 4px;
    font-size: 16px;
    background: transparent;
    border: 1px solid #aaa;
    margin-top: 24px;
    
    &:hover {
      background: #555;
      
    }
  }
`;

export const RankCard = styled.div`
  margin-top: 24px;
  display: flex;
  width: 90vw;
  max-width: 477px;
  height: 51px;
  /* background: #FDFAAE; */
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  justify-content: space-between;
  padding: 0 24px;
  align-items: center;

  div {
    display: flex;
    color: #444444;
    
    p {
      
      line-height: 51px;
    }
    h1 {
      margin-top: 0;
      padding-left: 24px;
      font-size: 18px;
      color: #333333;
      line-height: 51px;
    }
  }

  & + div {
    margin-top: 8px;
  }

`
