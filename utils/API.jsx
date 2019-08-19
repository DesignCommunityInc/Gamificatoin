import axios from 'axios';

export default axios.create({
  baseURL: 'http://10.0.4.129/api/',
  responseType: 'json',
  headers: {
    // 'X-Auth-Token': JSON.parse(localStorage.getItem('User')).token,
    'X-Auth-Token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvYXBwLnV1ZC5zY2hvb2xcLyIsImlhdCI6MTU2NjIxNDg0NCwibmJmIjoxNTY2MjIyMDQ0fQ.aCBkTIX6v38c1GWA44ZKliRanGQ7JHmbU4alInzfv3I',
  },
});

export function logout() {
  const eraseCookie = (name) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
  };
  localStorage.clear();
  eraseCookie('X-Auth-Token');
  window.location.replace('http://10.0.4.129/auth');
}

export function handleErrors(error) {
  console.log(`😱 Axios request failed: ${error}`);
  if (!error.response) {
    return;
  }
  console.log(error.response);
  switch (error.response.status) {
    case 401: {
      logout();
      break;
    }
    default: break;
  }
}
