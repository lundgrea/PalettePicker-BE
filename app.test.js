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
    it('should return a 200 status', async () => {
      const res = await request(app).get('/')
      expect(res.status).toBe(200)
    })
  })

  describe('GET /api/v1/folders', () => {
    it('should return a 200 and all of the folders', async () => {
      const expectedFolders = await database('folders').select()
  
      const res = await request(app).get('/api/v1/folders')
      const folders = res.body
  
      expect(res.status).toBe(200)
      expect(folders).toEqual(expectedFolders)
    })
  })

  describe('GET /folders/:id', () => {
    it('should return a 200 and a single folder if the folder exists', async () => {
      const expectedFolder = await database('folders').first()
      const id = expectedFolder.id
  
      const res = await request(app).get(`/api/v1/folders/${id}`)
      const result = res.body[0]
  
      expect(res.status).toBe(200)
      expect(result).toEqual(expectedFolder)
    })

    it('should return a 404 and the message "Folder not found"', async () => {
      const invalidId = -1;
      const response = await request(app).get(`/api/v1/folders/${invalidId}`)

      expect(response.status).toBe(404)
      expect(response.body.error).toEqual('Folder not found')
    })
  })

  describe('GET /palettes', () => {
    it('should return a 200 and all of the palettes', async () => {
      const expectedPalettes = await database('palettes').select()
  
      const res = await request(app).get('/api/v1/palettes')
      const palettes = res.body
  
      expect(res.status).toBe(200)
      expect(palettes).toEqual(expectedPalettes)
    })
  })

  describe('GET /palettes/:id', () => {
    it('should return a 200 and a single palette if the palette exists', async () => {
      const expectedPalette = await database('palettes').first()
      const id = expectedPalette.id
  
      const res = await request(app).get(`/api/v1/palettes/${id}`)
      const result = res.body[0]
  
      expect(res.status).toBe(200)
      expect(result).toEqual(expectedPalette)
    })

    it('should return a 404 and the message "Palette not found"', async () => {
      const invalidId = -1;
      const response = await request(app).get(`/api/v1/palettes/${invalidId}`)

      expect(response.status).toBe(404)
      expect(response.body.error).toEqual('Palette not found')
    })
  })
})