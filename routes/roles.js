const client = require('C:/unimanager/models/connection.js')
const express = require('express');
const {log} = require("debug");
const app = express();


client.connect();


const getRoles = (request, response) => {
    client.query('select * from roles', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getRoleById = (req, res) => {
    const id = parseInt(req.params.id)

    client.query('SELECT * FROM roles WHERE role_id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
}

module.exports = {
    getRoles,
    getRoleById,
}