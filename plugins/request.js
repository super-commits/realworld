import axios from 'axios'

export const request = axios.create({
  baseURL: 'https://api.realworld.io/api/'
})

export default ({ store }) => {
  // Add a request interceptor
  request.interceptors.request.use(function (config) {
    // Do something before request is sent
    const { user } = store.state
    if (Object.keys(user).length) {
      config.headers.authorization = `Token ${user.token}`
    }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });
}