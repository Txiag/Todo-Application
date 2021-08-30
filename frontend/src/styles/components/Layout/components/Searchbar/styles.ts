import styled from "styled-components";
export const Container = styled.form`
  align-self: center;
  display: flex;
  flex-direction: column;
  button {
    width: fit-content;
    :hover,
    :focus {
      cursor: pointer;
    }
  }
  input {
    width: 85%;
    ::placeholder {
      color: white;
    }
    color: white;
    background: none;
    border: none;
    border: 1px solid ${({ theme }) => theme.light};
    border-radius: 5;
    padding: 1em;
    font-size: 1em;
    :focus {
      outline: none;
    }
  }
  label {
    display: flex;
    gap: 8px;
    align-items: center;
    margin-top: 10px;
    input {
      width: fit-content;
    }
    display: flex;
  }
`;
