import * as filmApi from '../filmApi/index.js'

export const getRandom = async (req, res) => {
    try {
        const film = await filmApi.fetchRandom(req.query)
        console.log('Random Film request sent')
        res.status(200).json(film);
    } catch (error) {
        console.log("Faild Random")
        console.log(error.message)
        res.status(404).send(error.message);
    }
}
