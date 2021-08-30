import styled from "styled-components";

export const Container = styled.form`
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 1em;
  border-radius: 10px;
  background-color: #fff9de;
  box-sizing: border-box;
`;

export const Header = styled.div`
  height: fit-content;
  min-height: 1ch;
  border-bottom: 1px solid white;
  textarea {
    overflow: hidden;
    resize: none;
    width: 100%;
    background: none;
    border: none;
    outline: 0;
    height: 100px;
  }
`;
export const Content = styled.div`
  height: fit-content;
  margin-top: 6px;
  textarea {
    overflow: hidden;
    font-size: 1em;
    resize: none;
    width: 100%;
    background: none;
    border: none;
    outline: 0;
  }
`;

export const Footer = styled.div`
  display: flex;
  textarea {
    overflow: hidden;
    font-size: 1em;
    resize: none;
    width: 100%;
    background: none;
    border: none;
    outline: 0;
  }
  justify-content: flex-end;
`;

export const DoneButton = styled.button`
  display: flex;
  align-items: center;
  color: #fafafa;
  font-weight: bold;
  background: none;
  border: none;
  color: ${({ theme }) => theme.dark};

  :hover {
    cursor: pointer;
    color: ${({ theme }) => theme.dark};
  }
`;
