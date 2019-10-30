import api from '../api';

const lessons = {};

lessons.getAll = () => api.get('/lessons').then(res => res.data);
lessons.getAllByGrade = (gradeId) => api.get(`/lessons?grade_id=${gradeId}`).then(res => res.data);
lessons.getById = (id) => api.get(`/lessons/${id}`).then(res => res.data);
lessons.create = (lesson) => api.post('/lessons', lesson).then(res => res.data);
lessons.update = (lesson) => api.put(`/lessons/${lesson.id}`, lesson).then(res => res.data);

export default lessons;
