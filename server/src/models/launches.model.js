const launchesDB = require('./launches.mongo');
const planets = require('./planets.mongo');

const DEFAULT_FLIGHT_NUMBER = 100;

const launch = {
    flightNumber: 100,
    mission: 'Kepler Exploration X',
    rocket: 'Explorer IS1',
    launchDate: new Date('December 27, 2030'),
    target: 'Kepler-62 f',
    customer: ['ZTM', 'NASA'],
    upcoming: true,
    success: true,
}


const existsLaunchWithId = async (launchId) => {
    return await launchesDB.findOne({
        flightNumber: launchId,
    })
}

const getAllLaunches = async () => {
    return await launchesDB.find({}, {
        '_id': 0,
        '__v': 0
    })
}

const getLatestFlightNumber = async() => {
    const latestLaunch = await launchesDB.findOne().sort('-flightNumber');

    if (!latestLaunch) {
        return DEFAULT_FLIGHT_NUMBER;
    }

    return latestLaunch.flightNumber;
}

const saveLaunch = async (launch) => {
    const planet = await planets.findOne({
        keplerName: launch.target
    });

    if (!planet) {
        throw new Error('No matching planet was found')
    }

    await launchesDB.findOneAndUpdate({
        flightNumber: launch.flightNumber,
    }, launch, {
        upsert: true
    });
}

saveLaunch(launch)


const scheduleNewLaunch = async (launch) => {
    const newFlightNumber = await getLatestFlightNumber() + 1;

    const newLaunch = Object.assign(launch, {
        success: true,
        upcoming: true,
        customers: ['Zero to Mastery', 'NASA'],
        flightNumber: newFlightNumber,
    })

    await saveLaunch(newLaunch);
}

const abortLaunchById = async (launchId) => {
    const aborted = await launchesDB.updateOne({
        flightNumber: launchId,
    }, {
        upcoming: false,
        success: false,
    })

    return aborted.modifiedCount === 1
}

module.exports = {
    existsLaunchWithId,
    getAllLaunches,
    scheduleNewLaunch,
    abortLaunchById,
};