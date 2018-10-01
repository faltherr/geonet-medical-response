module.exports = {
  addSurvey: (req,res) => {
    let db = req.app.get('db')
    let {id, name, phone,location, latitude, longitude, age, famplan, hiv, parity, duedate, completed, HWID} = req.body
    db.add_survey([name, phone,location, latitude, longitude, age, famplan, hiv, parity, duedate, completed])
    .then(surveyResults => {

      db.add_patient_hw_connection(HWID, surveyResults[0].id).then(results =>{
        res.status(200).send(results)
      })
    }).then()
    .catch(err => {
      console.log(err)
      res.status(500).send('Something went wrong with adding patient')
    })
  },
  updateSurvey: (req, res) => {
    let {id} = req.params
    let {name, phone, location, latitude, longitude, age, famplan, hiv, parity, duedate, alert, completed} = req.body
    let db = req.app.get('db')
    
    db.update_survey([id, name, phone, location, latitude, longitude, age, famplan, hiv, parity, duedate, alert, completed])
    .then(results => {
      res.status(200).send(results)
    })
    .catch(err => {
      console.log(err)
      res.status(500).send('Something went wrong with updating patient')
    })
  }
}