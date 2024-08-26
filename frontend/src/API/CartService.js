import axios from "axios";

export default class CartService {
    static async getCart(authToken){
        const response = await axios.get('https://kidsland-store.com/api/v1/auth/cart/', {
            headers: {
                "Authorization": "Token " + authToken

            }
            
        })
        return response;
    }

    static async addProductInCart(authToken, id){
        console.log(authToken)
        const response = await axios.post('https://kidsland-store.com/api/v1/auth/cart/', {
            "identifier": id
        },{
            headers: {
                "Authorization": "Token " + authToken
            }
        })
        return response;
    }

    static async deleteProductInCart(authToken, id){
        console.log(authToken)
        const response = await axios.delete('https://kidsland-store.com/api/v1/auth/cart/' + id, {
            headers: {
                "Authorization": "Token " + authToken
            }
        })
        return response;
    }
}