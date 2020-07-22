import axios from 'axios'


const baseurl = "/api/persons"


const getAll = () => {
    return axios.get(baseurl)
}

const create = (newObject) => {
    return axios.post(baseurl, newObject)
}

const update = (id, newObject) => {
    return axios.post(`${baseurl}/${id}`, newObject)
}

const updateNumber = (id, newObject) => {
    return axios.put(`${baseurl}/${id}`, newObject)
    
}

const deletePerson = (id)=>{
    return axios.delete(`${baseurl}/${id}`)
}


export default {
    getAll:getAll,
    create:create,
    update:update,
    updateNumber:updateNumber,
    deletePerson:deletePerson
}