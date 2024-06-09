import styled from 'styled-components'
import {css} from "styled-components"

interface Props {
    isValid: boolean
}

const StyledButton = styled.input.attrs<Props>((props) => (
    { type: props.type || "button", value: props.value}
))`
    background-color: ${(props) => props.theme.colors.primary};
    border-radius: 80px;
    line-height: ${26/16}em;
    color: ${(props) => props.theme.colors.textColor};
    display: flex;
    justify-content: center;
    width: 100px;
    padding: 5px 0;
    border: none;
    cursor: pointer;
    ${props=> props.isValid && css`
        background-color: #B4B4B4;
        color: #FFFFFF;
    `}
`


export default function Button(props: any) {
    return (
        <StyledButton {...props} />
    )
}
