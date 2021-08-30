import styled from "styled-components";

export const Button = styled.button`
  background: none;
  border: none;
  font-size: 3em;
  :hover,
  :focus {
    cursor: pointer;
    color: ${({ theme }) => theme.secondary};
  }
`;

export const Header = styled.header`
  padding: 1em;
  justify-content: space-between;
  * {
    color: white;
    overflow: hidden;
  }
`;

export const Wrapper = styled.div``;
export const Container = styled.div`
  display: flex;
  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

export const MainContent = styled.div`
  width: 100%;
`;
export const Menu = styled.nav`
  background-color: ${({ theme }) => theme.secondary};
  width: 300px;
  @media (max-width: 600px) {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
`;
