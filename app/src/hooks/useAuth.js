import authStorage from "../auth/storage";
import { useContext } from "react";
import AuthContext from "../auth/AuthContext";
import jwtDecode from "jwt-decode";

export default useAuth = () => {
    const { user, setUser } = useContext(AuthContext);

    const logOut = () => {
        setUser(null);
        authStorage.removeToken()
    }

    const logIn = (token) => {
        const user = jwtDecode(token)
        setUser(user);
        authStorage.storeToken(token)
    }

    return { user, logOut, logIn }
}