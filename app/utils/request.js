import 'whatwg-fetch';
import BASE_URL from '../api';

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} endpoint       The endpoint we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export default function request(endpoint, method, body, withAuth) {
  const headers = {};
  if (body) headers['Content-Type'] = 'application/json';
  if (withAuth) {
    if (localStorage.getItem('auth_token') !== null) {
      headers.Authorization = localStorage.getItem('auth_token');
    } else {
      throw new Error('No auth token in localStorage');
    }
  }

  const options = { method, headers };
  if (body) options.body = JSON.stringify(body).toString();
  return fetch(BASE_URL + endpoint, options);
}
