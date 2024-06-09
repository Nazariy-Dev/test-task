import styled, { css } from 'styled-components'
import logo from "../../images/Logo.svg"
import Container from '../Common/Container'
import Button from '../Common/Button'

const StyledHeader = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 60px;
`
export default function Header() {
    return (
        <>
            <div style={{ backgroundColor: "#fff" }}>
                <Container>
                    <StyledHeader>
                        <img src={logo} alt="Logo" />
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <Button value={"Users"} onClick={() => { window.location.href = "#users" }} />
                            <Button value={"Sign up"} onClick={() => { window.location.href = "#signUp"}} />
                        </div>
                    </StyledHeader>
                </Container>
            </div>
        </>
    )
}
