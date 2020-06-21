import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
	* {
		margin: 0;
		padding: 0;
		outline: 0;
		box-sizing: border-box;
  }
  
  html {
    font-size: 62.5%;
  }
	
	button {
    cursor: pointer;
  }

  input, button {
    outline: none;
  }

  a {
    text-decoration: none;
  }
  
	body, html {
		height: 100vh;
  	width: 100vw;
		position: fixed;
		-webkit-font-smoothing: antialiased;
		overflow: hidden;
	}

	body, input, button {
    font-size: 1.6rem;
    font-family: Roboto, sans-serif
	}
	
	#root {
		display: flex;
		/* max-width: 960px; */
		/* margin: 0 auto; */
		/* padding: 40px 20px; */
	}
`;