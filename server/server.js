const express = require('express')
const session = require('express-session');
const bodyParser = require('body-parser')
const massive = require('massive')
const telerivet = require('telerivet')
const AuthCtrl = require('./AuthCtrl');

const controller = require('./controller')
require ('dotenv').config()

const app = express()
const port = 8443
const {CONNECTION_STRING} = process.env

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

app.get('/api/patients', controller.getPatients)

app.listen(port, () => {
  console.log('listening on port:', port)
})