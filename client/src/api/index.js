import axios from 'axios';

const url = 'http://localhost:5000';

export const getFilms = (parameters={}) => {
    return axios.get(url + '/search', {params: parameters})
};

export const getCountries = () => {
    return axios.get(url + '/countries')
};