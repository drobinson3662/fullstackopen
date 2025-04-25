import axios from "axios";

const url = "/api/persons";

const getAll = () => {
  const request = axios.get(url);
  return request.then((response) => response.data);
};

const create = (newObject) => {
  const request = axios.post(url, newObject);
  return request.then((response) => response.data);
};

const deletePerson = (newObject) => {
  const request = axios.delete(url + `/${newObject.id}`);
  return request.then((response) => response.data);
};

const modifyPerson = (id, newObject) => {
  const request = axios.put(`${url}/${id}`, newObject);
  return request.then((response) => response.data);
};

export default { getAll, create, deletePerson, modifyPerson };
