import React, { memo } from 'react'
import styled from 'styled-components'
import { User } from '../../lib/definitions'
import Text from '../Common/Text'

const Card = styled.li`
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    border-radius: 16px;
    background: #FFFFFF;
`
const TextLine = styled.div`
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
`
const Content = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
`
const StyledText = styled(Text)`
  width: 100%;
`
interface UserCardProps {
  user: User;
}

function UserCard(props: UserCardProps) {
  const user: User = props.user

  return (
    <Card>
      <img width={"70px"} height={"70px"} style={{ borderRadius: "50%" }} src={user.photo} alt={user.name} />

      <StyledText >
        <TextLine>{user.name}</TextLine>
      </StyledText>

      <Content>
        <StyledText >
          <TextLine>{user.position}</TextLine>
        </StyledText>
        <StyledText >
          <TextLine>{user.email}</TextLine>
        </StyledText>
        <StyledText >
          <TextLine>{user.phone}</TextLine>
        </StyledText>
      </Content>
    </Card >

  )
}

export default memo(UserCard)
