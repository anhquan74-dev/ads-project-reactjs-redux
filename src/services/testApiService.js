import httpRequest from '../utils/httpRequest';

class TestApiService {
  getPublicContent() {
    return httpRequest.get('/test/all');
  }

  getAdvertiserBoard() {
    return httpRequest.get('/test/advertiser');
  }

  getDACBoard() {
    return httpRequest.get('/test/dac');
  }

  getAdminBoard() {
    return httpRequest.get('/test/admin');
  }
}

export default new TestApiService();
