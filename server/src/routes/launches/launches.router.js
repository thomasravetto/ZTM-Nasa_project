const express = require('express');
const { httpGetAllLaunches,
        httpAddNewLaunch } = require('./launches.controller')

const launchesRouter = express.Router()

// /launches
launchesRouter.get('/', httpGetAllLaunches);
launchesRouter.post('/', httpAddNewLaunch);
launchesRouter.delete('/:id', httpAbortLaunch);

module.exports = launchesRouter;