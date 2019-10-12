import api from '../api';

const grades = {};

grades.getAll = () => api.get('/grades').then(res => res.data);
grades.getById = (id) => api.get(`/grades/${id}`).then(res => res.data);
grades.create = (grade) => api.post('/grades', grade).then(res => res.data);

export default grades;
