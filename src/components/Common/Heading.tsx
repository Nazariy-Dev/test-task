import styled from 'styled-components'

const StyledHeading = styled.h1`
    font-size: ${40 / 16}rem;
    line-height: ${40 / 16}rem;
    text-align: center;
    margin-bottom: 50px;
  `

export default function Heading(props: any) {
  return (
    <StyledHeading {...props} />
  )
}
