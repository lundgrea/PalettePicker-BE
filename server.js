const express = require('express')
const app = express()

app.use(express.json())

app.set('port', process.env.PORT || 3001)
app.locals.title = "Palette Picker"
app.get('/', (request, response) => {
  response.send("The colors have been gotten.")
})
app.listen(app.get("port"), () => {
  console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}`)
})