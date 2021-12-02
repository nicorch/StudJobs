import client from "./client"

const endPoint = "/users";

const register = (userInfo) => client.post(endPoint, userInfo)

const getUsers = () => client.get(endPoint)

export default {
    register,
    getUsers
}