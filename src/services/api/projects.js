import api from '../api';

const projects = {};

projects.getAll = () => api.get('/projects').then(res => res.data);
projects.getById = (id) => api.get(`/projects/${id}`).then(res => res.data);

export default projects;
