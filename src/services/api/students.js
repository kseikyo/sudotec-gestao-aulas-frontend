import api from '../api';

const students = {};

students.getAll = () => api.get('/students').then(res => res.data);
students.getById = (id) => api.get(`/students/${id}`).then(res => res.data);
students.create = (student) => api.post('/students', student).then(res => res.data);
students.update = (student) => api.put(`/students/${student.id}`, student).then(res => res.data);
students.delete = (id) => api.delete(`/students/${id}`).then(res => res.data);

export default students;
