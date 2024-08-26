import axios from "axios"

export default class CatalogService {
    static async getAll(){
        const response = await axios.get('https://kidsland-store.com/api/v1/products/?no_pagination')
        return response;
    }

    static async getProductsByPage(page = 1){
        const response = await axios.get('https://kidsland-store.com/api/v1/products', {
            params: {
                page
            }
        })
        return response;
    }

    static async getNewProducts(){
        const response = await axios.get('https://kidsland-store.com/api/v1/products?isNew=true')
        return response;
    }

    static async getFilteredProducts(filter, page){
        const response = await axios.get("https://kidsland-store.com/api/v1/products", {
            params: {
                category: filter,
                page
            }
        })
        return response;
    }

    static async getProductById(id){
        const response = await axios.get('https://kidsland-store.com/api/v1/products/' + id)
        return response;
    }
}