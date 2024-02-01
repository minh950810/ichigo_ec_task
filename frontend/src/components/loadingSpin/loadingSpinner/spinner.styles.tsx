import styled from 'styled-components'

export const SpinnerOverlay = styled.div`
    top: 50%;
    width: 100%;
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const SpinnerContainer = styled.div`
    display: inline-block;
    width: 150px;
    height: 150px;
    border: 5px solid rgba(255, 255, 255, 1);
    border-radius: 50%;
    border-top-color: #636767;
    animation: spin 1s ease-in-out infinite;
    -webkit-animation: spin 1s ease-in-out infinite;
    @keyframes spin {
        to {
            -webkit-transform: rotate(360deg);
        }
    }
    @-webkit-keyframes spin {
        to {
            -webkit-transform: rotate(360deg);
        }
    }
`
