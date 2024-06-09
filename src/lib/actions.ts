import { FormFields } from "../components/Form/Form";
import configuration from "../configuration";
import { PageResponse, PositionsResponse, PostResponse, QueryParams, TestApiClient, TokenResponse, addUserOptions } from "./definitions";
const url = configuration.apiUrl

async function get<TBody>(realtiveUrl: string) {

    const users = await fetch(`${url}${realtiveUrl}`)
    const res: TBody = await users.json()
    return res
}

async function post<TBody>(realtiveUrl: string, options: addUserOptions) {
    const {method, body, headers} = options
    const formData = new FormData()

    formData.append("email", body.email)
    formData.append("phone", body.phone)
    formData.append("name", body.name)
    formData.append("photo", body.photo)
    formData.append("position_id", body.position_id.toString())

    const requesOptions: RequestInit = {
        method,
        body: formData,
        headers
    }

    const users = await fetch(`${url}${realtiveUrl}`, requesOptions)
    const res: TBody = await users.json()
    return res
}

class ApiClient {
    async getUsers(queryParams: QueryParams) {
        const params = new URLSearchParams({
            page: queryParams.page.toString()
        });

        if (queryParams.count) {
            params.append("count", queryParams.count.toString())
        }
        if (queryParams.offset) {
            params.append("count", queryParams.offset.toString())
        }

        const res = await get<PageResponse>(`/users?${params}`)
        return res
    }
    async getPositions() {
        const res = await get<PositionsResponse>(`/positions`)
        return res
    }
    async getToken() {
        const res = await get<TokenResponse>(`/token`)
        return res
    }
    async addUser(formData: FormFields) {
        const token = (await this.getToken()).token
        
        let headers = new Headers();
        headers.append("Token", token);

        const options = {
            method: 'POST',
            body: formData,
            headers: headers
        } as addUserOptions

        const newUser = await post<PostResponse>("/users", options)
        return newUser
    }
}

export const client: TestApiClient = new ApiClient
