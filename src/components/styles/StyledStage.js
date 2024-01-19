import styled from 'styled-components';

export const StyledStage = styled.div`
    display: grid;
    grid-template-rows: repeat(${props => props.height}, 1fr);
    grid-template-columns: repeat(${props => props.width}, 1fr);
    grid-gap: 1px;
    border: 2px solid #1b85dc;
    box-shadow: #1b85dc 0px 0px 16px 7px;
    background: #111;
`