import * as filmApi from '../filmApi/index.js'

export const getGenres = async (req, res) => {
    try {
        const result = await filmApi.fetchGenres(req.query)
        console.log('Genres request sent')
        res.status(200).json(result.data);
    } catch (error) {
        console.log("Faild")
        res.status(404).send(error.message);
    }
}
