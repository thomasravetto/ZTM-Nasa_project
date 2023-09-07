const launches = new Map()

let latestFlightNumber = 100;

const launch = {
    flightNumber: 100,
    mission: 'Kepler Exploration X',
    rocket: 'Explorer IS1',
    launchDate: new Date('December 27, 2030'),
    target: 'Kepler-442 b',
    customer: ['ZTM', 'NASA'],
    upcoming: true,
    success: true,
}

launches.set(launch.flightNumber, launch);

const existsLaunchWithId = (id) => {
    return launches.has(launchId);
}

const getAllLaunches = () => {
    return Array.from(launches.values());
}

const addNewLaunch = (launch) => {
    latestFlightNumber++;
    launches.set(latestFlightNumber, Object.assign(launch, {
        success: true,
        upcoming: true,
        customers: ["Zero to Mastery", "NASA"],
        flightNumber: latestFlightNumber,
    }))
}

const abortLaunchById = (launchId) => {
    
}

module.exports = {
    getAllLaunches,
    addNewLaunch,
    abortLaunchById,
    existsLaunchWithId
};