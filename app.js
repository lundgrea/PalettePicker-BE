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

app.get('/api/v1/folders', async (request, response) => {
  const folders = await database('folders').select();

  return response.status(200).json(folders);
})

app.get('/api/v1/folders/:id', async (request, response) => {
  const folder = await database('folders').where('id', request.params.id).select();
  if(folder.length) {
    return response.status(200).json(folder)
  } else {
    return response.status(404).json({error: 'Folder not found'})
  }
})

app.get('/api/v1/palettes', async (request, response) => {
  const palettes = await database('palettes').select();

  return response.status(200).json(palettes);
})

app.get('/api/v1/palettes/:id', async (request, response) => {
  const palette = await database('palettes').where('id', request.params.id).select();
  if(palette.length) {
    return response.status(200).json(palette)
  } else {
    return response.status(404).json({error: 'Palette not found'})
  }
})

app.post('/api/v1/folders', async (request, response) => {
  const newFolderInfo = request.body;
  const folderParameters = Object.keys(newFolderInfo)

  if (folderParameters.includes('name')) {
        const folder = await database('folders').insert(newFolderInfo, 'id')
        return response.status(201).json({id: folder[0]})
      } else {
        return response.status(422).json({error: 'Request body is missing a parameter'})
      }
})

app.post('/api/v1/palettes', async (request, response) => {
  const newPaletteInfo = request.body;
  const paletteParameters = Object.keys(newPaletteInfo)

  if (paletteParameters.includes('name') &&
      paletteParameters.includes('c1') &&
      paletteParameters.includes('c2') &&
      paletteParameters.includes('c3') &&
      paletteParameters.includes('c4') &&
      paletteParameters.includes('c5')) {
        const palette = await database('palettes').insert(newPaletteInfo, 'id')
        return response.status(201).json({id: palette[0]})
      } else {
        return response.status(422).json({error: 'Request body is missing a parameter'})
      }
})


module.exports = app;