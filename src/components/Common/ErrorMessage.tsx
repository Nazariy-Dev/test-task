import React from 'react'
import styled from 'styled-components'

const StyledError = styled.div`
    color: ${(props) => props.theme.colors.error};
    font-size: 24px;
`

export default function ErrorMessage() {
    return (
        <StyledError>Something went srong :(</StyledError>
    )
}
