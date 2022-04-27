const client = require('../models/connection.js')
const express = require('express');
const {log} = require("debug");
const app = express();


client.connect();


const getNoticias = (request, response) => {
    client.query('select * from noticias', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getNoticiaById = (req, res) => {
    const id = parseInt(req.params.id)

    client.query('SELECT * FROM noticias WHERE noticia_id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
}

module.exports = {
    getNoticias,
    getNoticiaById,
}