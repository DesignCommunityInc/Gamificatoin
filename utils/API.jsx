import axios from 'axios';

export default axios.create({
    baseURL: 'http://10.0.4.129/api/',
    responseType: 'json',
    headers: {
      // 'X-Auth-Token': localStorage.getItem('X-Auth-Token'),
      'X-Auth-Token': "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvYXBwLnV1ZC5zY2hvb2xcLyIsImlhdCI6MTU2MzkyMDUxMCwibmJmIjoxNTYzOTI3NzEwfQ.hcSvUc5xHZ76d_1c7KYbXFRcQcVZCqIBgnwkG1LiG8I",
    },
});

export function handleErrors(e) {
  let code = null;
  if(e.response) {
    code = e.response.code;
    console.log(`😱 Axios request failed: ${e}`);
    console.log(e.response);
  }
  switch(code) {
    case 401: 
      logout();
      break;
    default: break;
  }
}
function logout() {
  const eraseCookie = (name) => {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }
  localStorage.clear();
  eraseCookie('X-Auth-Token');
  window.location.replace('http://10.0.4.129/');
}