const express = require('express')
    , session = require('express-session')
    , bodyParser = require('body-parser')
    , massive = require('massive')
    , AuthCtrl = require('./controllers/AuthCtrl')
    , PatientCtrl = require('./controllers/PatientsCtrl')
    , HealthworkersCtrl = require('./controllers/HealthworkersCtrl')
    , OutpostCtrl = require('./controllers/OutpostsCtrl')
    , SurveyCtrl = require('./controllers/SurveyCtrl')
    , What3wordsCtrl = require('./controllers/What3WordsCtrl')
    , sms_controller = require ('./controllers/sms_controller')
    , urlencoded = require('body-parser').urlencoded

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

//URL encoded is for parsing sms from twilio
app.use(urlencoded({ extended: true }));


massive(CONNECTION_STRING).then(db => {
  app.set('db', db)
  console.log('db is connected')
})


//WHAT3WORDS
// app.get(`https://api.what3words.com/v2/forward?key=${WHAT3WORDS_SECRET}`)

//AuthCtrl
app.get('/auth/callback', AuthCtrl.auth)
app.get('/api/currentUser', (req, res) => {
  res.send(req.session.user)
})

// PatientsCtrl
app.get('/api/patients', PatientCtrl.getPatients)
app.get('/api/patients/:id', PatientCtrl.getPatient)
// app.post('/api/patients', PatientCtrl.addPatient)
// app.put('/api/patients/:id', PatientCtrl.updatePatient)

// HealthworkersCtrl 
app.get('/api/healthworkers', HealthworkersCtrl.getHealthworkers)
app.post('/api/healthworkers', HealthworkersCtrl.addHealthworker)
app.get('/api/healthworkers/:id', HealthworkersCtrl.getHealthworker)

// OutpostCtrl 
app.get('/api/outposts', OutpostCtrl.getOutposts)

// SurveysCtrl 
app.post('/api/surveys', SurveyCtrl.addSurvey)
app.put('/api/surveys/:id', SurveyCtrl.updateSurvey)

// SMS controller
app.post('/sms', sms_controller.emergency)

app.listen(port, () => {
  console.log('listening on port:', port)
})
