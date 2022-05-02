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

const createNoticia = (request, response) => {
    const noticias = request.body;
    let insertQuery = `insert into noticias(noticia_titulo, noticia_descricao, noticia_data, noticia_image)
                    values ('${noticias.titulo}', '${noticias.descricao}', '${noticias.data}', '${noticias.image}')`
    client.query(insertQuery, (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const deleteNoticia = (request, response) => {
    let insertQuery = `DELETE from noticias WHERE noticia_id = ${request.params.id}`
    client.query(insertQuery, (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const updateNoticia = (request, response) => {
    let noticias = request.body;
    console.log(noticias);
    let updateQuery = `UPDATE noticias SET noticia_titulo = '${noticias.name}',                                  
                                      noticia_descricao = '${noticias.email}',
                                      noticia_data = '${noticias.password}',
                                      noticia_image = '${noticias.role_id}'
                                      WHERE noticia_id = ${noticias.id} `
    client.query(updateQuery, (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })

}

module.exports = {
    getNoticias,
    getNoticiaById,
    createNoticia,
    deleteNoticia,
    updateNoticia,
}