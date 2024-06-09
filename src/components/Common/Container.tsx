import styled from 'styled-components'

const StyledContainer = styled.div`
    max-width: ${(props) => props.theme.media.md1};
    margin: 0 auto;
    @media (max-width: ${(props) => props.theme.media.md2}) {
        padding: 0 60px;
    }
    @media (max-width: ${(props) => props.theme.media.md3}) {
        padding: 0 32px;
    }
    @media (max-width: ${(props) => props.theme.media.md4}) {
        padding: 0 16px;
    }
`

export default function Container(props: any) {
    return <StyledContainer {...props}/>
}
