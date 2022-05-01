const client = require('C:/unimanager/models/connection')
const express = require('express');
const {log} = require("debug");
const app = express();


client.connect();


const getEventos = (request, response) => {
    client.query('select * from eventos', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getEventoById = (req, res) => {
    const id = parseInt(req.params.id)

    client.query('SELECT * FROM eventos WHERE evento_id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
}

module.exports = {
    getEventos,
    getEventoById,
}