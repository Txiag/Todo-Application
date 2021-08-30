import styled from "styled-components";

export const Container = styled.div`
  background-color: ${({ theme }) => theme.dark};
  width: 100%;
  height: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: space-evenly;
  overflow-x: hidden;
`;
export const Column = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  gap: 1em;
  background-color: ${({ theme }) => theme.dark};
`;
