import { styled } from "styled-components"
import Container from "../Common/Container"

const StyledFooter = styled.footer`
    border-top: 1px solid #D0CFCF;
    padding: 17px 0;
    color: ${(props) => props.theme.colors.textColor};
`

export default function Footer() {
    return (
        <Container>
            <StyledFooter>
                © abz.agency specially for the test task
            </StyledFooter>
        </Container>
    )
}
