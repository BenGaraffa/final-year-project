import * as filmApi from '../filmApi/index.js'

export const getSearch = async (req, res) => {
    try {
        // If request body is empty replace with default from filmAPI
        if (req.body.constructor === Object 
            && Object.keys(req.body).length === 0) {
            req.body = filmApi.options
        }

        // Request films from the API
        console.log(`Request sent: ${req.body}`)
        // const results = await filmApi.fetchFilms(req.body);
        res.status(200).json(results.data);
    } catch (error) {
        res.status(404).send(error);
    }
}