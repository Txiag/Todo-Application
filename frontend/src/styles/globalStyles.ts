import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  @import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,700;1,300&display=swap");
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;1,100;1,200;1,300&display=swap');
  * {
      margin: 0;
      padding: 0;
      font-family: 'Poppins', sans-serif;
      overflow-x: hidden;
  }
  body {
      font-size: 12px;
      text-rendering: optimizeLegibility;
      -webkit-font-smoothing: antialiased !important;
      width: 100vw;
  }

  #root {
  }
`;
