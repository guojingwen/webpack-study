import axios from 'axios';

// http://localhost:8080/abc.json
axios.get('/api/abc.json').then(console.log).catch(console.error);
