import axios from "axios"

export default class LoginService {
    static async registration(email, password){
        const response = await axios.post('https://kidsland-store.com/api/v1/auth/register/', {
            email,
            password
        })
        return response;
    }
    
    static async login(email, password){
        const response = await axios.post('https://kidsland-store.com/api/v1/auth/login/', {
            email,
            password
        })
        return response;
    }

    static async google(google_token){
        const response = await axios.post('https://kidsland-store.com/api/v1/auth/google/', {
            google_token
        })
        return response;
    }
}