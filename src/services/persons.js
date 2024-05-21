import axios from 'axios'

const port = process.env.REACT_APP_BACKEND_PORT
const baseUrl = `http://localhost:${port}/api/persons`

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = (newPerson) => {
    const request = axios.post(baseUrl, newPerson)
    return request.then(response => response.data)
}

const update = (updatedPerson) => {
    const request = axios.put(`${baseUrl}/${updatedPerson.id}`, updatedPerson)
    return request.then(response => response.data)
}

const remove = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}


// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, update, remove }