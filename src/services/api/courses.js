import api from '../api';

const courses = {};

courses.getAll = () => api.get('/courses').then(res => res.data);
courses.getById = (id) => api.get(`/courses/${id}`).then(res => res.data);
courses.create = (course) => api.post('/courses', course, {headers: {'Content-type': 'multipart/form-data'}}).then(res => res.data);

courses.update = (course) => api.post(`/courses/${course.get('id')}`, course).then(res => res.data);
courses.delete = (id) => api.delete(`/courses/${id}`).then(res => res.data);

export default courses;
