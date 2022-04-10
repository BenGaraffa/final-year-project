import * as filmApi from '../filmApi/index.js'

export const getSearch = async (req, res) => {
    try {
        // If request query is empty replace with default from filmAPI
        if (req.query === {}) {
            req.query = filmApi.options
        }

        // Request films from the API
        const results = await filmApi.fetchFilms(req.query);
        
        console.log('Request sent')
        res.status(200).json(results.data); //.data); For when actual request is asked
    } catch (error) {
        console.log("Faild")
        res.status(404).send(error.message);
    }
}
