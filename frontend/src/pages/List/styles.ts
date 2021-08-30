import styled from "styled-components";

export const Container = styled.div`
  background-color: ${({ theme }) => theme.dark};
  width: 100%;
  height: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: space-evenly;
  overflow-x: hidden;
  padding: 1em 0;
`;
export const Column = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  gap: 1em;
  background-color: ${({ theme }) => theme.dark};
`;
