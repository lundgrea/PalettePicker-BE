const express = require('express')
const app = express()
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment]
const database = require('knex')(configuration)

app.use(express.json())

app.locals.title = "Palette Picker"

app.get('/', (request, response) => {
  response.send("The colors have been gotten.")
})

app.get('/students', async (request, response) => {
  const students = await database('students').select();

  return response.status(200).json(students);
})

module.exports = app;