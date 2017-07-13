import { ajax } from 'rxjs/observable/dom/ajax';
import config from '../config';

function formatUrl(path) {
  const adjustedPath = path[0] !== '/' ? '/' + path : path;
  return 'http://' + config.apiHost + '/' + config.apiVersion + adjustedPath;
}

function sanitize(param) {
  return encodeURIComponent(param);
}

function get(url) {
  return ajax.getJSON(formatUrl(url));
}

function post(url, body) {
  console.log(body);
  return ajax.post(formatUrl(url), body, {
    'Content-Type': 'application/json'
  });
}

class ApiClient {
  search(address, schoolType) {
    return get(`/search/${sanitize(address)}/${sanitize(schoolType)}`);
  }

  getSchool(id) {
    return get(`/school/${id}`);
  }

  getSchools(ids) {
    console.log(ids);
    return post('/school', { ids });
  }
}

export default ApiClient;
