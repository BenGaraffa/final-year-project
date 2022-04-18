import axios from "axios";
import { createRequire } from "module"; 
const require = createRequire(import.meta.url);
const apiKey = require("./api-keys.json");

// Default film search parameters
const emptyFilters = {
    country: 'us',
    services: 'netflix',
    type: 'movie',
    order_by: 'imdb_rating',

    year_min: '1950',
    year_max: new Date().getFullYear(),

    page: '1',
    desc: 'true',

    genres: '',  
    genres_relation: 'or',

    min_imdb_rating: '0',
    max_imdb_rating: '100',
    min_imdb_vote_count: '0',
    max_imdb_vote_count: '3000000',

    language: '',
    output_language: 'en',
    keyword: ''
};

// Fetch single page of films
export const fetchFilms = (customOptions) => {
    return axios.request({
            method: 'GET',
            url: 'https://streaming-availability.p.rapidapi.com/search/ultra',
            params: customOptions,
            headers: {
              'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com',
              'X-RapidAPI-Key': apiKey['filmKey']
            }
    });
};  

// Fetch Countries data from API
export const fetchCountries = () => {
	return axios.request({
			method: 'GET',
			url: 'https://streaming-availability.p.rapidapi.com/countries',
			headers: {
					'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com',
					'X-RapidAPI-Key': apiKey['filmKey']
			}
	});
};  

// Fetch Genre data from API
export const fetchGenres = () => {
	return axios.request({
			method: 'GET',
			url: 'https://streaming-availability.p.rapidapi.com/genres',
			headers: {
					'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com',
					'X-RapidAPI-Key': apiKey['filmKey']
			}
	});
};  
