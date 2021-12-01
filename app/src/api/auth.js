import client from "./client"

const endPoint = "/auth";

const login = (email, password) => client.post(endPoint, { email, password })

export default {
    login
}