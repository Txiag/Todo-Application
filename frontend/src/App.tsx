import React from "react";
import "react-toastify/dist/ReactToastify.min.css";
import GlobalStyles from "./styles/globalStyles";

import Routes from "./routes";
import { ThemeProvider } from "styled-components";
import { Dark, Light } from "./styles/colors";
import ToastContainer from "./styles/toastStyles";

const isDarkTheme = true;
const App = () => (
  <>
    <ThemeProvider theme={isDarkTheme ? Dark : Light}>
      <GlobalStyles />
      <Routes />
      <ToastContainer position="top-center" autoClose={5000} />
    </ThemeProvider>
  </>
);

export default App;
