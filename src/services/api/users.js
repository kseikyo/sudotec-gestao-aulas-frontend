import api from '../api';

const users = {};

users.getLogged = () => api.get('/user').then(res => res.data);
users.getAll = () => api.get('/users').then(res => res.data);
users.getById = (id) => api.get(`/users/${id}`).then(res => res.data);
users.create = (user) => api.post('/auth/register', user).then(res => res.data);
users.update = (user) => api.put(`/users/${user.id}`, user).then(res => res.data);
users.delete = (id) => api.delete(`/users/${id}`).then(res => res.data);

export default users;
