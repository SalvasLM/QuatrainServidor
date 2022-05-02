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
  let insertQuery = `insert into users(user_name, user_email, user_password, user_role_id, user_image)
                    values ('${users.name}', '${users.email}', '${users.password}', '${users.role_id}', '${users.image}')`
  client.query(insertQuery, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const deleteUser = (request, response) => {
  let insertQuery = `DELETE from users WHERE user_id = ${request.params.id}`
  client.query(insertQuery, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const updateUser = (request, response) => {
  let users = request.body;
  let updateQuery = `UPDATE users SET user_name = '${users.name}',
                                      user_email = '${users.email}',
                                      user_password = '${users.password}',
                                      user_role_id = '${users.role_id}',
                                      user_image = '${users.image}'
                                      WHERE user_id = ${users.id} `
  client.query(updateQuery, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })

}


module.exports = {
  getUsers,
  getUserById,
  createUser,
  deleteUser,
  updateUser,
}
