import axios from "axios";
const baseUrl = '/api/contacts';

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const config = {
    headers: { Authorization: token },
  }
    return axios.get(baseUrl, config).then(response => response.data)
  }

const create = newObject => {
  const config = {
    headers: { Authorization: token },
  }
  return axios.post(baseUrl, newObject, config).then(response => response.data)
}  

const deleteEntry = id => {
  const config = {
    headers: { Authorization: token },
  }
  return axios.delete(`${baseUrl}/${id}`, config).then(response => response.data)
}

const update = (id, newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.put(`${baseUrl}/${id}`, newObject, config)
  return request.then(response => response.data)
}

const personService = {
    getAll, 
    create,
    deleteEntry,
    update,
    setToken,
}

export default personService;