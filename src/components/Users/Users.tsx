import { useEffect, useState } from 'react'
import styled from 'styled-components'
import Heading from '../Common/Heading'
import Section from '../Common/Section'
import { useUsers } from '../../store'
import { QueryParams } from '../../lib/definitions'
import UserCard from './UserCard'
import Button from '../Common/Button'
import StyledProgress from '../Common/StyledProgress'
import ErrorMessage from '../Common/ErrorMessage'

const UsersList = styled.div`
    color: ${(props) => props.theme.colors.textColor};

`
const Cards = styled.ul`
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    justify-content: space-between;
    gap: 25px;
    margin-bottom: 50px !important;

    @media (max-width: ${(props) => props.theme.media.md3}) {
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 16px;
    }

    @media (max-width: ${(props) => props.theme.media.md4}) {
        grid-template-columns: repeat(1, minmax(0, 1fr));
        gap: 20px;
    }
`
const StyledButton = styled(Button)`
    margin: 0 auto;
    padding: 5px 19px;
    width: auto;
`
export default function Users() {
    const [query, setQuery] = useState<QueryParams>({ page: 1, count: 6 })
    const usersPage = useUsers(state => state.usersPage)
    const usersLoading = useUsers(state => state.loading)
    const getUsers = useUsers(state => state.getUsers)


    useEffect(() => {
        getUsers(query)
    }, [query])

    return (
        <Section id='users'>
            <UsersList >
                <Heading>Working with GET request</Heading>
                <Cards>
                    {!usersPage.success && usersPage.users.length >0 && <ErrorMessage />}
                    {usersPage.users.map((user) => (
                        <UserCard key={user.id} user={user} />
                    ))}
                </Cards>
                {usersLoading && <StyledProgress />}
                {query.page < usersPage.total_pages && <StyledButton onClick={() => setQuery((q) => ({ ...q, page: q.page + 1 }))} value={"Show more"} />}
            </UsersList>
        </Section>
    )
}
