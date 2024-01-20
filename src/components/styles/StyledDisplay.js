import styled from "styled-components";

export const StyledDisplay = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  margin: 0 0 20px 0;
  border: 4px solid #1b85dc;
  box-shadow: #1b85dc 0px 0px 16px 3px;
  min-height: 30px;
  width: 100%;
  border-radius: 16px;
  color: ${(props) => (props.gameOver ? "red" : "#999")};
  background: #000;
  font-family: Pixel, Arial, Helvetica, sans-serif;
  font-size: 0.8rem;
  padding: 1rem;
  max-width: 200px;

  @media screen and (min-height: 100vw) {
    margin: 0 5px 10px 5px;
    height: 1rem;
  }
`;
