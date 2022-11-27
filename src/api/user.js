import httpmethods from '@/http/index'

export function saveUser(userdata) {

  return  httpmethods.axios.post('/blogapi/admin/webUser/', userdata)
}

export function getUser(id) {

    return  httpmethods.axios.get('/blogapi/admin/webUser/'+id, {})
  }

  export function login(email,password) {

    return httpmethods.axios.post('/blogapi/webLogin', {email:email,password:password});
  }

  export function register(userinfo) {

    return httpmethods.axios.post('/blogapi/register', userinfo);
  }

  export function loginBytoken(url,token) {

    return httpmethods.axios.post('/blogapi'+url, {token:token});
  }