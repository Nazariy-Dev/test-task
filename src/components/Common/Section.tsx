import styled from "styled-components"
import Container from "./Container"

const StyledSection = styled.section`
    margin-bottom: 140px;
`

export default function Section(props: any) {
  return (
    <Container>
        <StyledSection {...props}/>
    </Container>
  )
}
