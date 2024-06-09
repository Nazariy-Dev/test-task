
import styled from 'styled-components'
import bg from "../../images/pexels-alexandr-podvalny-1227513.webp"
import Heading from '../Common/Heading'
import Button from '../Common/Button'
import Section from '../Common/Section'
import Text from '../Common/Text'

const StyledHero = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    /* background:
        linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), 
        url(${bg}) 
        50% 80% / 219% no-repeat; */
    background:
        linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), 
        url(${bg}) 
        center/cover no-repeat;
    padding: 163px 0;
    @media (max-width: ${(props) => props.theme.media.md2}) {
        margin: 0 -60px;
        padding: 89px 0;
    }
    @media (max-width: ${(props) => props.theme.media.md3}) {
        margin: 0 -32px;
        /* background:
        linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), 
        url(${bg}) 
        center/ cover  no-repeat; */
    }
    @media (max-width: ${(props) => props.theme.media.md4}) {
        padding: 40px 16px 67px 16px;
        margin: 0 -16px;
    }
    
`
const Content = styled.div`
    max-width: 360px;
    text-align: center;
    color: #fff;
`
const Body = styled.div`
    margin-bottom: 32px;
`
export default function Hero(props: any) {
    return (
        <Section>
            <StyledHero >
                <Content >
                    <Heading style={{ marginBottom: "21px" }}>Test assignment for front-end developer</Heading>
                    <Body><Text>What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS with a vast understanding of User design thinking as they'll be building web interfaces with accessibility in mind. They should also be excited to learn, as the world of Front-End Development keeps evolving.</Text></Body>
                    <Button style={{ margin: "0 auto" }} value={"Sign up"}  onClick={() => { window.location.href = "#signUp"}}></Button>
                </Content>
            </StyledHero>
        </Section>
    )
}
