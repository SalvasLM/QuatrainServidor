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
  const queryObject = request.body;
  console.log(queryObject)

  let query1 = 'INSERT INTO users ('
  let query2 = ' ) VALUES ('

  if (Object.keys(queryObject)[0] === "user_password"){
    query1 += `${Object.keys(queryObject)[0]}, `
    query2 += `${ "'" + md5(queryObject[Object.keys(queryObject)[0]]) + "', " }`
  }else {
    query1 += `${Object.keys(queryObject)[0]}, `
    query2 += `${ "'" + queryObject[Object.keys(queryObject)[0]] + "', " }`
  }

  for (let i = 1; i < Object.keys(queryObject).length; i++) {
    if (Object.keys(queryObject)[i] === "user_password"){
      query1 += `${Object.keys(queryObject)[i]}, `
      query2 += `${ "'" + md5(queryObject[Object.keys(queryObject)[i]]) + "', " }`
    }else {
      query1 += `${Object.keys(queryObject)[i]}, `
      query2 += `${ "'" + queryObject[Object.keys(queryObject)[i]] + "', " }`
    }
  }

  query1 = query1.substring(0, query1.length - 2)
  query2 = query2.substring(0, query2.length - 2)
  query2 += ')'

  fullQuery = query1+query2
  console.log(fullQuery)

  client.query(fullQuery, (error, results) => {
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
}
