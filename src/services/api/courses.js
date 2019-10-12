import api from '../api';

const courses = {};

courses.getAll = () => api.get('/courses').then(res => res.data);
courses.getById = (id) => api.get(`/courses/${id}`).then(res => res.data);

export default courses;
