import * as filmApi from '../filmApi/index.js'

export const getSearch = async (req, res) => {
    try {
        // If request query is empty replace with default from filmAPI
        if (req.query === {}) {
            req.query = filmApi.options
        }

        // Request films from the API
        const results = await filmApi.fetchFilmsDynamic(req.query);
        
        console.log('Film request sent')
        res.status(200).json(results); 
    } catch (error) {
        console.log("Faild", error.message)
        res.status(404).send(error.message);
    }
}
