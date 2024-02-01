import styled from 'styled-components'

interface Props {
    size: number
}

export const BarContainer = styled.div`
    height: 20px;
    background: rgb(255, 255, 255);
    border-radius: 50px;
    width: 100%;
    overflow: hidden;
`

export const Bar = styled.div<Props>`
    height: 20px;
    width: ${(props) => props.size}%;
    background: ${(props) =>
        props.size > 70
            ? 'rgb(34, 185, 41)'
            : props.size > 40
              ? 'rgb(106, 27, 154)'
              : 'rgb(236, 9, 20)'};
    transition: width 1s ease-in -out 0s;
    border-radius: inherit;
    display: flex;
    align-item: center;
    justify-content: flex-end;

    span {
        padding: 2px;
        color: rgb(255, 255, 255);
        font-weight: bold;
        font-size: 15px;
        display: initial;
    }
`
