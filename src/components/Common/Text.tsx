import styled from "styled-components"

const StyeldText = styled.div`
    line-height: 26px;
    font-size: 16px;
`

export default function Text(props: any) {
  return (
    <StyeldText {...props}/>
  )
}
