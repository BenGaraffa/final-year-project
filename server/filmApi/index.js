import axios from "axios";
import console from "console";
import clone from 'just-clone';
import { createRequire } from "module"; 
const require = createRequire(import.meta.url);
const apiKey = require("./api-keys.json");

// Default search parameters of the API
const emptyFilters = {
    country: 'us',
    services: 'netflix',
    type: 'movie',
    order_by: 'imdb_rating',
    page: {
		range: [1, 2],
		startIndex: 0,
		endIndex: 25,
		size: 25,
		direction: 0
	},

    year_min: '1950',
    year_max: new Date().getFullYear(),

    desc: 'false',

    genres: '',  
    genres_relation: 'and',

    min_imdb_rating: '0',
    max_imdb_rating: '100',
    min_imdb_vote_count: '0',
    max_imdb_vote_count: '3000000',

    language: '',
    output_language: 'en',
    keyword: ''
};

const parseParameters = (parameters) => {
	// Disregard default optional parameters to simplify query
	for (let key of Object.keys(emptyFilters).slice(5)) {
		if (parameters[key] === emptyFilters[key]) {
			delete parameters[key]
		}
	}

	// Parse the JSON string into an object
	parameters.page = JSON.parse(parameters.page)
	
	return parameters
};

// Fetch single page of films
export const fetchFilms = (customOptions) => {
    return axios.request({
            method: 'GET',
            url: 'https://streaming-availability.p.rapidapi.com/search/ultra',
            params: handleParameters(customOptions),
            headers: {
              'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com',
              'X-RapidAPI-Key': apiKey['filmKey']
            }
    });
};  

export const fetchFilmsDynamic = async (customOptions) => {
	const parameters = parseParameters(customOptions);
	var tempParameters = clone(parameters);
	var request = {
		method: 'GET',
		url: 'https://streaming-availability.p.rapidapi.com/search/ultra',
		params: parameters,
		headers: {
		  'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com',
		  'X-RapidAPI-Key': apiKey['filmKey']
		}
	};

	var totalResults = []
	switch (parameters.page.direction) {
		case 0:
			// Fetch and group page results
			let range = parameters.page.range;
			for (let page = range[0]; page < range[1]; page++) {
				// Update parameters and send request
				tempParameters.page = page;
				request.params = tempParameters;
				let response = await axios.request(request);
				var { results, total_pages } = response.data;

				// Push results
				totalResults.push(...results);
			}

			// slice page to size
			totalResults = totalResults.slice(
				parameters.page.startIndex,
				(totalResults.length - 25 + parameters.page.endIndex)
			);

			var newPageParam = parameters.page;
			break;

		case 1:
			var currentPage = parameters.page.endIndex === 25? 
				parameters.page.range[1]: 
				parameters.page.range[1] -1;

			do {
				// Update parameters and send request
				tempParameters.page = currentPage;
				request.params = tempParameters;
				let response = await axios.request(request);
				var { results, total_pages } = response.data;

				totalResults.push(...results);
				currentPage++;
				
			} while (
				totalResults.length - (
					parameters.page.endIndex === 25? 0: parameters.page.endIndex
				) !== parameters.page.size
				&& currentPage !== total_pages
			);

			// slice page to size
			totalResults = totalResults.slice(
				//Start from where the last page left off
				parameters.page.startIndex,
				(totalResults.length - 25 + parameters.page.endIndex)
			);

			// setup replacement page
			var newPageParam = clone(parameters.page);
			newPageParam.range = [parameters.page.range[1], currentPage];
			newPageParam.direction = 0;
			console.log(newPageParam);
			break;

		case -1:
			var currentPage = parameters.page.startIndex === 0? 
				parameters.page.range[0] - 1: 
				parameters.page.range[0];

			do {
				// Update parameters and send request
				tempParameters.page = currentPage;
				request.params = tempParameters;
				let response = await axios.request(request);
				var { results, total_pages } = response.data;

				totalResults.unshift(...results);
				currentPage--;
				
			} while (
				totalResults.length - (
					parameters.page.startIndex === 0? 0: 
					25 - parameters.page.startIndex
				) !== parameters.page.size
				&& currentPage !== 0
			);

			// slice page to size
			totalResults = totalResults.slice(
				//Start from where the last page left off
				parameters.page.startIndex,
				(totalResults.length - 25 + parameters.page.endIndex)
			);

			// setup replacement page
			var newPageParam = clone(parameters.page);
			newPageParam.range = [currentPage + 1, parameters.page.range[0]];
			newPageParam.direction = 0;
			console.log(newPageParam);
			break;
	
		default:
			break;
	};
	return {
		results: totalResults, 
		total_pages: total_pages, 
		page: newPageParam
	};
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

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const fetchRandom = async (receivedParams) => {
	var parameters = parseParameters(receivedParams);

	var request = {
		method: 'GET',
		url: 'https://streaming-availability.p.rapidapi.com/search/ultra',
		params: parameters,
		headers: {
		  'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com',
		  'X-RapidAPI-Key': apiKey['filmKey']
		}
	};

	// request random film
	let response = (await axios.request(request)).data.results;

	return response[getRandomInt(0, response.length)] // return random film
}
