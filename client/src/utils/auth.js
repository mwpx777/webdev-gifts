// AUTH

import decode from 'jwt-decode';

class AuthService {
    getProfile() {
    return decode(this.getToken());
    }

    isTokenExpired(token) {
        try{
            const decoded = decode(token);
            if(decoded.exp < Date.now()/ 1000) {
                return true;
            } else return false;
        } catch (err) {
            return false;
        }
    }

    getToken() {
        return localStorage.getItem('id_token');
    }
    
    login(idToken) {
        localStorage.setItem('id_token', idToken);
        window.location.assign('/');
    }

    logout(){
        localStorage.removeItem('id_token');
        // redirect to homepage and reset the state of th application
        window.location.assign('/');
    }
}

export default new AuthService();