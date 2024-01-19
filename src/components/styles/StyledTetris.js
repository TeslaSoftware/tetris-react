import styled from "styled-components";

import bgImage from "../../img/cyberpunk_tetris.png";

export const StyledTetrisWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(rgba(0, 0, 255, 0.5), rgba(255, 255, 0, 0.5)),
    url(${bgImage}) #000;
  background-size: cover;
  overflow: hidden;
  display: flex;
  align-items: center;
`;

export const StyledTetris = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 40px;
  margin: 0 auto;
  max-width: 900px;

  aside {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 200px;
    padding: 0 20px;
    flex-wrap: wrap;
  }

  @media screen and (min-height: 100vw) {
    flex-direction: column;
    align-items: center;
    padding: 20px 10px;

    aside {
      flex-direction: row;
      padding: 20px 0;
      justify-content: center;
      width: auto;
      max-width: 100%;
    }
  }
`;
