import styled from 'styled-components'

export const CardContainer = styled.div`
    display: flex;
    flex-direction: row;
    font-size: 20px;
    text-align: center;
    margin-bottom: 10px;
    width: 80%;
    padding: 20px 0;
    background-color: rgb(224, 224, 222);
    margin: auto;
    text-align: center;
    border-radius: 10px;
    box-shadow: 10px;

    @media (max-width: 800px) {
        flex-direction: column;
    }
`

export const CardItem = styled.div`
    padding: 10px;
    flex: 30%;
`
