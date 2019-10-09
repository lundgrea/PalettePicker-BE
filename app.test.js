const request = require('supertest')
const app = require('./app')
import 'regenerator-runtime/runtime'
const environment = process.env.NODE_ENV || 'development'
const configuration = require('./knexfile')[environment]
const database = require('knex')(configuration)

describe('Server', () => {

  beforeEach(async () => {
    await database.seed.run()
  });

  describe('init', () => {
    it.skip('should return a 200 status', async () => {
      const res = await request(app).get('/')
      expect(res.status).toBe(200)
    })
  })

  describe('GET /api/v1/folders', () => {
    it.skip('should return a 200 and all of the folders', async () => {
      const expectedFolders = await database('folders').select()
  
      const res = await request(app).get('/api/v1/folders')
      const folders = res.body
  
      expect(res.status).toBe(200)
      expect(folders).toEqual(expectedFolders)
    })
  })

  describe('GET /folders/:id', () => {
    it.skip('should return a 200 and a single folder if the folder exists', async () => {
      const expectedFolder = await database('folders').first()
      const id = expectedFolder.id
  
      const res = await request(app).get(`/api/v1/folders/${id}`)
      const result = res.body[0]
  
      expect(res.status).toBe(200)
      expect(result).toEqual(expectedFolder)
    })

    it.skip('should return a 404 and the message "Folder not found"', async () => {
      const invalidId = -1;
      const response = await request(app).get(`/api/v1/folders/${invalidId}`)

      expect(response.status).toBe(404)
      expect(response.body.error).toEqual('Folder not found')
    })
  })

  describe('GET /palettes', () => {
    it.skip('should return a 200 and all of the palettes', async () => {
      const expectedPalettes = await database('palettes').select()
  
      const res = await request(app).get('/api/v1/palettes')
      const palettes = res.body
  
      expect(res.status).toBe(200)
      expect(palettes).toEqual(expectedPalettes)
    })
  })

  describe('GET /palettes/:id', () => {
    it.skip('should return a 200 and a single palette if the palette exists', async () => {
      const expectedPalette = await database('palettes').first()
      const id = expectedPalette.id
  
      const res = await request(app).get(`/api/v1/palettes/${id}`)
      const result = res.body[0]
  
      expect(res.status).toBe(200)
      expect(result).toEqual(expectedPalette)
    })

    it.skip('should return a 404 and the message "Palette not found"', async () => {
      const invalidId = -1;
      const response = await request(app).get(`/api/v1/palettes/${invalidId}`)

      expect(response.status).toBe(404)
      expect(response.body.error).toEqual('Palette not found')
    })
  })

  describe('POST /api/v1/folders', () => {
    it('should post a new folder to the db', async () => {
      
      const newFolder = { name: 'Winter Wonderland' }
  
      const res = await request(app)
        .post('/api/v1/folders')
        .send(newFolder)
  
      const folders = await database('folders').where('id', res.body.id).select()
      const folder = folders[0]
  
      expect(res.status).toBe(201)
      expect(folder.name).toEqual(newFolder.name)
    })

    it('should return a 422 and "Request body is missing a parameter"', async () => {
      const newFolder = { wazee: 'Winter Wonderland'}
  
      const res = await request(app)
        .post('/api/v1/folders')
        .send(newFolder)

      expect(res.status).toBe(422)
      expect(res.body.error).toEqual('Request body is missing a parameter')      
    })
  })

  describe('POST /api/v1/palettes', () => {
    it('should post a new palette to the db', async () => {
      const expectedFolder = await database('folders').first()
      const id = expectedFolder.id
      const newPalette = { name: 'Shady Grove', c1: "#050505", c2: "#004FFF", c3: "#31AFD4", c4: "#902D41", c5: "#FFOO7F", folder_id: id}
  
      const res = await request(app)
        .post(`/api/v1/folders/${id}/palettes`)
        .send(newPalette)
  
      const palettes = await database('palettes').where('id', res.body.id).select()
      const palette = palettes[0]
  
      expect(res.status).toBe(201)
      expect(palette.name).toEqual(newPalette.name)
    })

    it('should return a 422 and "Request body is missing a parameter"', async () => {
      const expectedFolder = await database('folders').first()
      const id = expectedFolder.id
      const newPalette = { name: 'Winter Wonderland'}
  
      const res = await request(app)
        .post(`/api/v1/folders/${id}/palettes`)
        .send(newPalette)

      expect(res.status).toBe(422)
      expect(res.body.error).toEqual('Request body is missing a parameter')      
    })
  })
})