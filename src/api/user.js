import httpmethods from '@/http/index'

export function saveUser(userdata) {

  return  httpmethods.axios.post('/blogapi/api/user/api/register', userdata)
}

export function getUser(id) {

    return  httpmethods.axios.get('/blogapi/api/user/'+id, {})
  }