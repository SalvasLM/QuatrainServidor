const client = require('../models/connection.js')
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

const createEvento = (request, response) => {
    const eventos = request.body;
    let insertQuery = `insert into eventos(evento_titulo, evento_descricao, evento_data, evento_image, evento_local)
                    values ('${eventos.titulo}', '${eventos.descricao}', '${eventos.data}', '${eventos.image}', '${eventos.local}')`
    client.query(insertQuery, (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const deleteEvento = (request, response) => {
    let insertQuery = `DELETE from eventos WHERE evento_id = ${request.params.id}`
    client.query(insertQuery, (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}
module.exports = {
    getEventos,
    getEventoById,
    createEvento,
    deleteEvento,
}