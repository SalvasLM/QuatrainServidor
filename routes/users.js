const client = require('../models/connection')
const express = require('express');
const {log} = require("debug");
const app = express();


client.connect();


const getUsers = (request, response) => {
  client.query('select * from users', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getUserById = (req, res) => {
  const id = parseInt(req.params.id)

  client.query('SELECT * FROM users WHERE user_id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  })
}

module.exports = {
  getUsers,
  getUserById,
}
