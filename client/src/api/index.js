import axios from 'axios';

const url = 'http://localhost:5000';


// Async functions for requesting data from the backend

export const getFilms = (parameters={}) => {
    return axios.get(url + '/search', {params: parameters})
};

export const getCountries = () => {
    return axios.get(url + '/countries')
};

export const getGenres = () => {
    return axios.get(url + '/genres')
};

export const getRandomFilm = async (parameters={}) => {
    try {
        const { data } = await axios.get(
            url + '/random',
            {params: parameters}
        );
        return data
    } catch (error) {
       console.log(error.message) 
    }
};
