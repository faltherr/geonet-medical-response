const express = require('express')
const bodyParser = require('body-parser')
const massive = require('massive')
const telerivet = require('telerivet')

const controller = require('./controller')
require ('dotenv').config()

const app = express()
const port = 8443
const {CONNECTION_STRING} = process.env

app.use(bodyParser.json())

massive(CONNECTION_STRING).then(db => {
  app.set('db', db)
  console.log('db is connected')
})

app.get('/api/patients', controller.getPatients)
app.get('/api/healthworkers', controller.getHealthworkers)
app.get('/api/outposts', controller.getOutposts)
app.get('/api/surveys', controller.getSurveys)

app.get('/api/patients/:id', controller.getPatient)
app.get('/api/healthworkers/:id', controller.getHealthworker)
app.get('/api/surveys/:id', controller.getSurvey)

app.listen(port, () => {
  console.log('listening on port:', port)
})