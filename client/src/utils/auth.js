import decode from 'jwt-decode';

class AuthService {
  getProfile() {
    return decode(this.getToken());
  }

  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        localStorage.clear()
        window.location.reload()
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

    if (typeof idToken !== 'undefined') {
      localStorage.setItem('id_token', idToken);
      localStorage.setItem('loggedIn', true);
      window.location.assign(`/`);
    } else {
      alert('Error: Error en los datos o Este usuario ya existe')
    }
  }

  logout() {
    localStorage.clear();
    window.location.assign('/');
  }
};

const newAuth = new AuthService();

export default newAuth;
