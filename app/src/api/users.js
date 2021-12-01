import client from "./client"

const endPoint = "/users";

const register = (userInfo) => client.post(endPoint, userInfo)

export default {
    register
}