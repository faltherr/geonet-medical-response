const express = require('express')
const session = require('express-session');
const bodyParser = require('body-parser')
const massive = require('massive')
const telerivet = require('telerivet')
const AuthCtrl = require('./AuthCtrl')
const what3words = require('./what3WordsController')
const controller = require('./controller')
require ('dotenv').config()

const app = express()
const port = 8443
const {CONNECTION_STRING, WHAT3WORDS_SECRET} = process.env


app.use(session({
  secret: process.env.SESSION_SECRET,
  saveUninitialized: false,
  resave: false
}))

app.use(bodyParser.json())

massive(CONNECTION_STRING).then(db => {
  app.set('db', db)
  console.log('db is connected')
})

//Auth
app.get('/auth/callback', AuthCtrl.auth)
app.get('/api/currentUser', (req, res) => {
  res.send(req.session.user)
})

//WHAT3WORDS
// app.get(`https://api.what3words.com/v2/forward?key=${WHAT3WORDS_SECRET}`)


app.get('/api/patients', controller.getPatients)
app.get('/api/healthworkers', controller.getHealthworkers)
app.get('/api/outposts', controller.getOutposts)
app.get('/api/surveys', controller.getSurveys)

app.get('/api/patients/:id', controller.getPatient)
app.get('/api/healthworkers/:id', controller.getHealthworker)
app.get('/api/surveys/:id', controller.getSurvey)

app.post('/api/patients', controller.addPatient)
app.post('/api/healthworkers', controller.addHealthworker)

app.put('/api/patients/:id', controller.updatePatient)

app.listen(port, () => {
  console.log('listening on port:', port)
})