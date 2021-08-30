import React from "react";
import {
  Header,
  Wrapper,
  Button,
  Menu,
  Container,
  MainContent,
} from "./styles";
import Searchbar from "./components/Searchbar";
const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Wrapper>
        <Container>
          <Menu>
            <Header>
              <Button>todos</Button>
              <Searchbar />
            </Header>
          </Menu>
          <MainContent>{children}</MainContent>
        </Container>
      </Wrapper>
    </>
  );
};

export default Layout;
