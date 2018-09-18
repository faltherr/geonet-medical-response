const express = require('express')
const bodyParser = require('body-parser')
const telerivet = require('telerivet')

const app = express()
const port = 8443

app.use(bodyParser.json())

app.listen(port, () => {
  console.log('listening on port:', port)
})