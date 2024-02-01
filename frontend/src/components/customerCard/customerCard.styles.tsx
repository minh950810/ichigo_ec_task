import styled from 'styled-components'

export const CardContainer = styled.div`
    background-color: rgb(224, 224, 222);
    width: 80%;
    padding: 30px 0;
    border-radius: 10px;
    margin: auto;
    margin-bottom: 20px;
    margin-top: 20px;
    box-shadow:
        0 8px 16px 0 rgb(224, 224, 222, 0.1),
        0 6px 20px 0 rgb(224, 224, 222, 0.1);

    &:hover {
        cursor: pointer;
    }
`

export const CardRow = styled.div`
    display: flex;
    flex-direction: row;
    text-align: center;
`

export const RowSide = styled.span`
    padding: 10px;
    flex: 30%;
`

export const RowMain = styled.span`
    padding: 10px;
    flex: 100%;
`
