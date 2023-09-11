const http = require('http');
const mongoose = require('mongoose');

const app = require('./app')
const { loadPlanetsData } = require('./models/planets.model')

const PORT = process.env.PORT || 3500;

const MONGO_URL = "mongodb+srv://thomasravetto:fzQvqrxkk7cLJAPD@nasacluster.tsttzfo.mongodb.net/nasa?retryWrites=true&w=majority"


const server = http.createServer(app)

mongoose.connection.once('open', () => {
    console.log('MongoDB connection ready')
})

mongoose.connection.on('error', (err) => {
    console.error(err);
})

// Since the load planet function is asyncronous, I am calling async await when I start the server
// so that the data is loaded before starting
async function startServer() {
    await mongoose.connect(MONGO_URL)
    await loadPlanetsData();

    server.listen(PORT, () => {
        console.log("Server working and listening on port:", PORT)
    })
}

startServer()
