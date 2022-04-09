import axios from 'axios';

const url = 'http://localhost:5000/search';

export const getFilms = (parameters={}) => axios.get(url, {params: parameters});
