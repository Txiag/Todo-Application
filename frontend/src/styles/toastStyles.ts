import { ToastContainer } from "react-toastify";
import styled from "styled-components";

const Container = styled(ToastContainer)`
  .Toastify__toast--error {
    background: #cc6666;
    color: white;
    border-radius: 8px;
  }
  .Toastify__toast--success {
    background: #66bb66;
    color: white;
    border-radius: 8px;
  }
`;

export default Container;
