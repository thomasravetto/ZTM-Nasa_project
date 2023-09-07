const http = require('http');
const express = require('express')

const app = require('./app')
const { loadPlanetsData } = require('./models/planets.model')

const PORT = process.env.PORT || 3500;

const server = http.createServer(app)


// Since the load planet function is asyncronous, I am calling async await when I start the server
// so that the data is loaded before starting
async function startServer() {
    await loadPlanetsData()
    server.listen(PORT, () => {
        console.log("Server working and listening on port:", PORT)
    })
}

startServer()
