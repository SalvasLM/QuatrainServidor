const client = require('../models/connection.js')
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

const getUserById = (request, response) => {
  const id = parseInt(request.params.id)

  client.query('SELECT * FROM users WHERE user_id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createUser = (request, response) => {
  const users = request.body;
  let insertQuery = `insert into users(user_name, user_email, user_password, user_role_id) 
                    values (${users.name}, ${users.email}, ${users.password} ${users.role_id})`
  client.query(insertQuery, (error, result) => {
    if (error) {
      throw error
    } else { response.status(200).json(results.rows) }
  })
}


module.exports = {
  getUsers,
  getUserById,
  createUser,
}
