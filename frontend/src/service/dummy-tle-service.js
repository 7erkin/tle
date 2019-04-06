import axios from 'axios'

class DummyTLEService {
    constructor(){
        this._baseUrl = 'http://localhost:5000';
        this._axiosInstance = axios.create({
            baseURL: this._baseUrl
        })
    }
    getSatellitesByFirstLetter(letter) {
      return new Promise((resolve, reject) => {
        this._axiosInstance.get('/satellites', {
          params: {
              letter
          },
          responseType: 'json'
        })
        .then(satellites => resolve(satellites))
      })
    }
    downloadTLE(satteliteNames) {}
}

export default DummyTLEService;