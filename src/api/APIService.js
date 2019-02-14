// Package dependencies
import axios from 'axios';

// Local dependencies
import Environment from '../lib/environment';


class APIService {
  static BASE_URL = Environment.get('API_GATEWAY');
  static HEADERS = {
    'Content-Type': 'application/json'
  };

  constructor(resource) {
    this.resource = `/${resource}`;
    this.headers = APIService.HEADERS;
    this.axios = this.createAxiosInstance();
  }

  setHeaders = headers => {
    this.headers = Object.assign({}, APIService.HEADERS, headers);
  };

  createAxiosInstance = config => {
    let configuration = Object.assign(
      {},
      {
        baseURL: APIService.BASE_URL,
        timeout: 1000,
        headers: this.headers
      },
      config
    );
    return axios.create(configuration);
  };

  get = () => {
    return this.axios.get(this.resource);
  };

  post = payload => {
    return this.axios.post(this.resource, payload);
  };
}

export default APIService;
