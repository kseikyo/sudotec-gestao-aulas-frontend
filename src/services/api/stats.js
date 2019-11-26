import api from '../api';

const stats = {};

stats.get = () => api.get('/stats').then(res => res.data);

export default stats;
