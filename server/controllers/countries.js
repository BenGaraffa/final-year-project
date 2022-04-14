import * as filmApi from '../filmApi/index.js'

export const getCountries = async (req, res) => {
    try {
        const result = await filmApi.fetchCountries(req.query)
        console.log('Countries request sent')
        res.status(200).json(result.data);
    } catch (error) {
        console.log("Faild")
        res.status(404).send(error.message);
    }
}
