import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response  = await axios.get(baseUrl)
  return response.data
}

const create = async (content) => {
  const response = await axios.post(baseUrl,content)
  return response.data
}

const updateLikes = async (id) => {
  const current = await axios.get(`${baseUrl}/${id}`)
  console.log('current.data: ',current.data)
  current.data.votes = current.data.votes + 1
  const response = await axios.put(`${baseUrl}/${id}`,current.data)
  return response.data
}


export default { getAll , create, updateLikes }