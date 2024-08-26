import axios from "axios"

export default class OrderService {
    static async addOrder(authToken){
        console.log(authToken)
        const response = await axios.post('https://kidsland-store.com/api/v1/products/order/', {}, {
            headers: {
                "Authorization": "Token " + authToken
            }
    })
        return response;
    }

    static async getOrders(authToken){
        const response = await axios.get('https://kidsland-store.com/api/v1/products/order/', {
            headers: {
                "Authorization": "Token " + authToken
            }
        })
        return response;
    }
}