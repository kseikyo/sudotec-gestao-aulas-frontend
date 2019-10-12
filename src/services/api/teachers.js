import api from '../api';

const teachers = {};

teachers.getAll = () => api.get('/teachers').then(res => res.data);
teachers.getById = (id) => api.get(`/teachers/${id}`).then(res => res.data);

export default teachers;
