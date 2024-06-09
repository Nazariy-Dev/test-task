import { FormFields } from "../components/Form/Form"

export interface TestApiClient {
    getUsers: (params: QueryParams) => Promise<PageResponse>
    getPositions: () => Promise<PositionsResponse>,
    getToken: () => Promise<TokenResponse>,
    addUser: (formData: FormFields) => Promise<PostResponse>
}

export interface PostResponse {
    success: boolean,
    user_id: number,
    message: string
}

export interface SubmitStatus {
    success: boolean,
    message: string
}

export interface addUserOptions {
    method: 'POST' | 'GET',
    body: FormFields,
    headers: Headers
}

export interface TokenResponse {
    success: boolean,
    token: string
}

export interface PageResponse {
    success: boolean,
    total_pages: number,
    total_users: number,
    count: number,
    page: number,
    links: {
        next_url: string | null,
        prev_url: string | null
    },
    users: User[]
}

export interface PositionsResponse {
    success: boolean,
    positions: Position[]
}

export interface Position {
    id: number,
    name: string
}

export interface User {
    id: number,
    name: string
    email: string
    phone: string
    position: string
    position_id: number,
    registration_timestamp: number,
    photo: string
}

export interface QueryParams {
    count?: number,
    offset?: number,
    page: number
}