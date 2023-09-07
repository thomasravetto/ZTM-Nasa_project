const { getAllLaunches } = require('../../models/launches.model');

const httpGetAllLaunches = (req, res) => {
    return res.status(200).json(getAllLaunches())
}

module.exports = {
    httpGetAllLaunches,
}