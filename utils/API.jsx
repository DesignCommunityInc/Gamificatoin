import axios from 'axios';

export default axios.create({
  baseURL: 'http://10.0.4.129/api/',
  responseType: 'json',
  headers: {
    // 'X-Auth-Token': localStorage.getItem('X-Auth-Token'),
    'X-Auth-Token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvYXBwLnV1ZC5zY2hvb2xcLyIsImlhdCI6MTU2NTU1MzUwOCwibmJmIjoxNTY1NTYwNzA4fQ.k_76C3GEHWFHvKXyOJzSUjgPbyb-6Xz1EZ3wn0er2PM',
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
  if (!error.response) {
    console.log(error);
    return;
  }
  console.log(`😱 Axios request failed: ${error}`);
  console.log(error);
  switch (error.response.status) {
    case 401: {
      logout();
      break;
    }
    default: break;
  }
}
