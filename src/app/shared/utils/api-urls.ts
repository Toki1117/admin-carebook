import { environment } from "src/environments/environment"

const baseUrl = environment.baseUrl;
export const API_URL = {
    authentication: {
        login: `${baseUrl}/manager/signin`,
        refresh: `${baseUrl}/refresh`
    }
}