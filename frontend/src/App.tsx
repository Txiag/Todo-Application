import React from "react";
import "react-toastify/dist/ReactToastify.min.css";
import GlobalStyles from "./styles/globalStyles";

import Routes from "./routes";
import { ThemeProvider } from "styled-components";
import { DefaultTheme } from "./styles/colors";
import ToastContainer from "./styles/toastStyles";

const App = () => (
  <>
    <ThemeProvider theme={DefaultTheme}>
      <GlobalStyles />
      <Routes />
      <ToastContainer position="top-center" autoClose={5000} />
    </ThemeProvider>
  </>
);

export default App;
