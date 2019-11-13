import api from '../api';

const projects = {};

projects.getAll = () => api.get('/projects').then(res => res.data);
projects.getById = (id) => api.get(`/projects/${id}`).then(res => res.data);
projects.create = (project) => api.post('/projects', project, {headers: {'Content-type': 'multipart/form-data'}}).then(res => res.data);

projects.update = (project) => api.post(`/projects/${project.get('id')}`, project).then(res => res.data);
projects.delete = (id) => api.delete(`/projects/${id}`).then(res => res.data);

export default projects;
