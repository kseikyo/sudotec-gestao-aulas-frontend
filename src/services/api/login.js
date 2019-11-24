import api from '../api';

const login = {};

login.restorePassword = (data) => api.post('/auth/password/reset', data).then(res => res.data);
login.requestReset = (data) => api.post(`/auth/password/email`, data).then(res => res.data);

export default login;
