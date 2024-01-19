import styled from 'styled-components';

export const StyledStage = styled.div`
    display: grid;
    grid-template-rows: repeat(
        ${props => props.height},
        calc(25vw / ${props => props.width})
    );
    grid-template-columns: repeat(${props => props.width}, 1fr);
    grid-gap: 1px;
    border: 2px solid #1b85dc;
    box-shadow: #1b85dc 0px 0px 16px 7px;
    width: 100%;
    max-width: 25vw;
    background: #111;
`