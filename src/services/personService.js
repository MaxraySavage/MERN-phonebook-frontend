import axios from "axios";
const baseUrl = 'https://aqueous-ridge-34409.herokuapp.com/api/persons';

const getAll = () => {
    return axios.get(baseUrl).then(response => response.data)
  }

const create = newObject => {
  return axios.post(baseUrl, newObject).then(response => response.data)
}  

const deleteEntry = id => {
  return axios.delete(`${baseUrl}/${id}`).then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const personService = {
    getAll, 
    create,
    deleteEntry,
    update
}

export default personService;