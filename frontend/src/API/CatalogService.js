import axios from "axios"

export default class CatalogService {
    static async getAll(){
        const response = await axios.get('https://kidsland-store.com/api/v1/products')
        return response;
    }

    static async getProductById(id){
        const response = await axios.get('https://kidsland-store.com/api/v1/products/' + id)
        return response;
    }
}