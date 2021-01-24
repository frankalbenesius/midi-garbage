import React from "react";
import styled from "styled-components";

interface LayoutProps {
  aside: React.ReactNode;
  main: React.ReactNode;
}

const Layout = (props: LayoutProps) => {
  return (
    <Wrapper>
      <Aside>{props.aside}</Aside>
      <Main>{props.main}</Main>
    </Wrapper>
  );
};

export default Layout;

const Wrapper = styled.div`
  display: flex;
  height: 100%;
`;

const Aside = styled.aside`
  flex: 0 0 15rem;
  padding: 1rem;
  border-right: 2px solid black;
`;

const Main = styled.main`
  flex: 1;
`;
