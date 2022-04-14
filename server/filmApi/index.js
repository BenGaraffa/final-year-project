import axios from "axios";
import { createRequire } from "module"; 
const require = createRequire(import.meta.url);
const apiKey = require("./api-keys.json");

// Default film search parameters
export const options = {
        country:            "us",
        services:            "netflix",
        type:               "movie",
        order_by:           "imdb_vote_count",

        genre:              "18",
        page:               "1",
        output_language:    "en",
        language:           "en"
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
