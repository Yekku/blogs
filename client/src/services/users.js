import axios from 'axios'
const baseUrl = '/api/users'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async newUser => {
  const response = await axios.post(baseUrl, newUser)
  return response.data
}

const getById = async id => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

export default { getAll, create, getById }