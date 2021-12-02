import client from "./client"

const endPoint = "/categories"

const getCategories = () => client.get(endPoint);

export default {
    getCategories
}