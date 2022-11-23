import httpRequest from './httpRequest';
import TokenService from '../services/tokenService';
import { logoutFromRedux, refreshToken } from '../redux/actions/authAction';

const setup = (store) => {
  // setup request cho moi lan goi request voi axios(httpRequest)
  httpRequest.interceptors.request.use(
    (config) => {
      const token = TokenService.getLocalAccessToken();
      if (token) {
        // config.headers.Authorization = 'Bearer ' + token; // neu co token thi config header cho moi lan goi request
        config.headers = { ...httpRequest.headers, Authorization: `Bearer ${token}` };
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  const { dispatch } = store;
  httpRequest.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      const originalConfig = err.config;
      if (originalConfig.url !== '/v1/auth/login' && err.response) {
        // Access Token was expired
        if (err.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true;

          try {
            const rs = await httpRequest.post('/v1/auth/refreshtoken', {
              refreshToken: TokenService.getLocalRefreshToken(),
            });

            const { accessToken } = rs.data;

            dispatch(refreshToken(accessToken));
            TokenService.updateLocalAccessToken(accessToken);

            return httpRequest(originalConfig);
          } catch (_error) {
            return Promise.reject(_error);
          }
        }
        if (err.response.status === 403) {
          TokenService.removeUser('user');
          dispatch(logoutFromRedux());
        }
      }

      return Promise.reject(err);
    },
  );
};

export default setup;
