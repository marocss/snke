import styled, { css } from 'styled-components';

export const Container = styled.div`
  background: #2F2F2F;
`;
export const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  align-items: center;

  h1 {
    margin-top: 5vh;
    color: #fff;

    & + h1 {
      margin-top: 0;
    }

    span {
      font-size: 100px;
    }
  }

  div {
    display: flex;
    flex-direction: column;
  }

  /* label {
    margin-top: 24px;
    color: #ddd
  } */

  /* input {
    height: 40px;
    width: 308px;
    border-radius: 4px 4px 0 0;
    border: 2px solid #eee;
    padding-left: 8px;
    font-size: 14px;
    margin-top: 4px;
    outline: none;

    &:focus {
      border: 2px solid #383
    }

    ${props => props.hasError && props.hasError &&
			css`
				border: 2px solid #c53030;
			` }
  } */

  /* button {
    border: none;
    background: #000;
    color: #fff;
    font-size: 14px;
    font-weight: bold;
    height: 40px;
    width: 308px;
    border-radius: 0 0 4px 4px;
    
    &:hover {
      background: #141614;
    }
  } */
`;

export const Form = styled.div`

display: flex;
flex-direction: column;

label {
  margin-top: 2.4rem;
  color: #ddd
}

p {
  font-size: 1.2rem;
  color: #c53030;
}


input {
    height: 40px;
    width: 308px;
    border-radius: 4px 4px 0 0;
    border: 1px solid #eee;
    padding-left: 8px;
    font-size: 1.6rem;
    margin-top: 4px;
    outline: none;

    &:focus {
      border: 1px solid #383
    }

    ${props => props.hasError &&
			css`
				border: 1px solid #c53030;
			` }
  }

  button {
    border: none;
    background: #000;
    color: #fff;
    font-size: 1.4rem;
    font-weight: bold;
    height: 40px;
    width: 308px;
    border-radius: 0 0 4px 4px;
    outline: none;

    ${props => props.isLoading &&
			css`
				color: #444;
			` }
    
    &:hover {
      background: #141614;
    }
  }
`