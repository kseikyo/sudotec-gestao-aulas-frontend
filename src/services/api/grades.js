import api from '../api';

const grades = {};

grades.getAll = () => api.get('/grades').then(res => res.data);
grades.getById = (id) => api.get(`/grades/${id}`).then(res => res.data);
grades.create = (grade) => api.post('/grades', grade).then(res => res.data);
grades.update = (grade) => api.put(`/grades/${grade.id}`, grade).then(res => res.data);
grades.delete = (id) => api.delete(`/grades/${id}`).then(res => res.data);

grades.addStudent = (grade_id, student_id) => api.post(`/grades/${grade_id}/students`, {student_id: student_id}).then(res => res.data);
grades.removeStudent = (grade_id, student_id) => api.delete(`/grades/${grade_id}/students/${student_id}`).then(res => res.data);
grades.students = (id) => api.get(`/grades/${id}/students`).then(res => res.data);
grades.searchStudents = (id, search) => api.get(`/grades/${id}/students/search?search=${search}`).then(res => res.data);

export default grades;
