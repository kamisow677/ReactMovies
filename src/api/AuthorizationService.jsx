import axios from 'axios';
const API_URL = 'http://localhost:8080'

export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'
export const PASSWORD_SESSION_ATTRIBUTE_NAME = 'password'
export const ROLE_SESSION_ATTRIBUTE_NAME = 'role'

class AuthenticationService {

    state = {
        ax: axios.create(),
      }

    executeBasicAuthenticationService(username, password) {
        return axios.get(`${API_URL}/user/login`,
            { headers: { authorization: this.createBasicAuthToken(username, password) } })
    }

    executeJwtAuthenticationService(username, password) {
        return axios.post(`${API_URL}/authenticate`, {
            username,
            password
        })
    }

    createBasicAuthToken(username, password) {
        return 'Basic ' + window.btoa(username + ":" + password)
    }

    createBasicAuthToken2() {
        return 'Basic ' + window.btoa(this.getUsername() + ":" + this.getPassword())
    }


    registerSuccessfulLogin(username, password, role) {
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username)
        sessionStorage.setItem(PASSWORD_SESSION_ATTRIBUTE_NAME, password)
        sessionStorage.setItem(ROLE_SESSION_ATTRIBUTE_NAME, role)
        this.setupAxiosInterceptors(this.createBasicAuthToken(username, password))
    }

    getUsername() {
        return sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
    }

    getPassword() {
        return sessionStorage.getItem(PASSWORD_SESSION_ATTRIBUTE_NAME)
    }

    isLoggedUser() {
        console.log(sessionStorage.getItem(ROLE_SESSION_ATTRIBUTE_NAME))
        if (this.isUserLoggedIn() && (sessionStorage.getItem(ROLE_SESSION_ATTRIBUTE_NAME) === 'USER'))
            return true
        else   
            return false
    }

    isLoggedAdmin() {
        if (this.isUserLoggedIn() && (sessionStorage.getItem(ROLE_SESSION_ATTRIBUTE_NAME) === 'ADMIN'))
            return true
        else   
            return false
    }

    registerSuccessfulLoginForJwt(username, token) {
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username)
        this.setupAxiosInterceptors(this.createJWTToken(token))
    }

    createJWTToken(token) {
        return 'Bearer ' + token
    }

    logout() {
        sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        sessionStorage.removeItem(PASSWORD_SESSION_ATTRIBUTE_NAME);
        sessionStorage.removeItem(ROLE_SESSION_ATTRIBUTE_NAME);
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        if (user === null) return false
        return true
    }

    getLoggedInUserName() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        if (user === null) return ''
        return user
    }

    setupAxiosInterceptors(token) {
        console.log(token)
        axios.interceptors.request.use(
            function (config)  {
                config.headers.authorization = token
                // if (this.isUserLoggedIn()) {
                //     config.headers.authorization = token
                // }
                return config
            }
        )
    }
}

export default new AuthenticationService()