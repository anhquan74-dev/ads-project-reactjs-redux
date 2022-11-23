import httpRequest from '../utils/httpRequest';
import TokenService from './tokenService';
class AuthService {
  login = (user) => {
    return httpRequest.post('/v1/auth/login', user);
  };

  logout = (refreshToken) => {
    TokenService.removeUser('user');
    return httpRequest.post('/v1/auth/logout', { refreshToken });
  };
}

export default new AuthService();
