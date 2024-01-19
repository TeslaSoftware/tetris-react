import styled from 'styled-components';

export const StyledStartButton = styled.button`
    box-sizing: border-box;
    margin: 0 0 20px 0;
    padding: 20px;
    min-height: 30px;
    width: 100%;
    border-radius: 20px;
    border: none;
    box-shadow: inset #333 0px 0px 4px 4px;
    color: white;
    background: #1b85dc;
    font-family: Pixel, Arial, Helvetica, sans-serif;
    font-size: 1rem;
    outline: none;
    cursor:  pointer;

    &:active{
        box-shadow: inset #333 0px 0px 4px 4px;
        transform: scale(0.9);
    }
`