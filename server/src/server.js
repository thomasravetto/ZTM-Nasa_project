const http = require('http');
require('dotenv').config();

const app = require('./app')
const { mongoConnect } = require('./services/mongo')
const { loadPlanetsData } = require('./models/planets.model')
const { loadLaunchData } = require('./models/launches.model')

const PORT = process.env.PORT || 3500;


const server = http.createServer(app)

// Since the load planet function is asyncronous, I am calling async await when I start the server
// so that the data is loaded before starting
async function startServer() {
    try {
        await mongoConnect();
    await loadPlanetsData();
    await loadLaunchData();

    server.listen(PORT, () => {
        console.log("Server working and listening on port:", PORT)
    })
    } catch {
        console.error("An error occurred while starting the server")
        }
    }


startServer()
