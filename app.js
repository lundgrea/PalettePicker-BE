const express = require('express')
const app = express()
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment]
const database = require('knex')(configuration)
const cors = require('cors');

app.use(cors());

app.use(express.json())

app.locals.title = "Palette Picker"

app.get('/', (request, response) => {
  response.send("The colors have been gotten.")
})

app.get('/api/v1/folders', async (request, response) => {
  const specificName = request.query.name
  const folders = await database('folders').select();
  if (specificName) {
    const foundFolder = folders.find(folder => folder.name == specificName)
    return response.status(200).json(foundFolder)
  } else { 
  return response.status(200).json({ folders })
  }
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

app.get('/api/v1/folders/:id/palettes', async (request, response) => {
  const folder = await database('folders').where('id', request.params.id).select();
  if(folder.length) {
    const palettes = await database('palettes').where('folder_id', request.params.id).select()
    return response.status(200).json(palettes)
  } else {
    return response.status(404).json({error: 'Folder not found'})
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

app.post('/api/v1/folders/:folder_id/palettes', async (request, response) => {
  const newPaletteInfo = request.body;
  const paletteParameters = Object.keys(newPaletteInfo)

  if (paletteParameters.includes('name') &&
      paletteParameters.includes('c1') &&
      paletteParameters.includes('c2') &&
      paletteParameters.includes('c3') &&
      paletteParameters.includes('c4') &&
      paletteParameters.includes('c5') &&
      paletteParameters.includes('folder_id')) {
        const palette = await database('palettes').where('folder_id', request.params.id).insert(newPaletteInfo, 'id')
        return response.status(201).json({id: palette[0]})
      } else {
        return response.status(422).json({error: 'Request body is missing a parameter'})
      }
})

app.delete('/api/v1/folders/:id', async (request, response) => {
  const folder = await database('folders').where('id', request.params.id).select();
  if (folder.length) {
  const deletePromises = [database('palettes').where('folder_id', request.params.id).del(), database('folders').where('id', request.params.id).del()]
  const deletedRecords = await Promise.all(deletePromises)
  return response.status(200).json(`Folder and all associated palettes with Primary Folder ID: ${request.params.id} has been deleted`)
  } else {
    return response.status(400).json({error: 'Record does not exist'})
  }
})

app.delete('/api/v1/palettes/:id', async (request, response) => {
  const palette = await database('palettes').where('id', request.params.id).select();
  if (palette.length) {
  const deletePalette = await database('palettes').where('id', request.params.id).del()
  return response.status(200).json(`Palettes with Palette ID: ${request.params.id} has been deleted`)
  } else {
    return response.status(404).json({error: 'Record does not exist'})
  }
})

app.patch('/api/v1/palettes/:id', async (request, response) => {
  let attribute;
  const newPaletteInfo = request.body;
  const attributes = Object.keys(newPaletteInfo)
  const palette = await database('palettes').where('id', request.params.id).select();
  if(!attributes.length) {
    return response.status(404).json({error: 'Please add relevant palette info'})
  }  else {
    attribute = attributes[0]
  }
  if (palette.length) {
    const selectedPalette = await database('palettes').where('id', request.params.id).update(attribute, newPaletteInfo[attribute])
    const palettes = await database('palettes').select();
    return response.status(200).json(palettes);

  } else {
    return response.status(404).json({error: 'Palette not found'})
  }
})

app.patch('/api/v1/folders/:id', async (request, response) => {
  const newFolderInfo = request.body;
  const folder = await database('folders').where('id', request.params.id).select();

  if (folder.length) {
    const selectedFolder = await database('folders').where('id', request.params.id).update('name', newFolderInfo.name)
    const folder = await database('folders').where('id', request.params.id).select()
    return response.status(200).json(folder);

  } else {
    return response.status(404).json({error: 'Folder not found'})
  }
})


module.exports = app;