import { create } from "zustand";
import { PageResponse, Position, QueryParams } from "../src/lib/definitions";
import { client } from "./lib/actions";

interface UsersState {
    loading: boolean
    usersPage: PageResponse,
    getUsers: (params?: QueryParams) => void,
}
interface PositionsState {
    loading: boolean,
    getPositions: () => void,
    positions: Position[]
}




const useUsers = create<UsersState>(
    (set) => ({
        usersPage: {
            success: false,
            total_pages: 0,
            total_users: 0,
            count: 0,
            page: 0,
            links: {
                next_url: null,
                prev_url: null
            },
            users: []
        },
        loading: true,
        getUsers: async (params: QueryParams = {page: 1, count: 6}) => {
            set({ loading: true })

            const res = await client.getUsers(params)

            set((state) => {
                let newUserPage;

                if (params.page == 1) {
                    newUserPage = res
                } else {
                    newUserPage = { ...res, users: [...state.usersPage.users, ...res.users] }
                }
                return {
                    usersPage: newUserPage,
                    loading: false
                }
            })
        }

    })
)

const usePositons = create<PositionsState>(
    (set) => ({
        loading: true,
        positions: [],
        getPositions: async () => {
            set({ loading: true })
            const res = await client.getPositions()
            set({ positions: res.positions, loading: false })
        }
    })
)

export { useUsers, usePositons };