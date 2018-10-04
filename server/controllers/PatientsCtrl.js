module.exports = {
  getPatients: (req, res) => {
    const db = req.app.get('db')

    db.get_patients()
    .then(results => {
      res.status(200).send(results)
    })
    .catch(err => {
      console.log(err)
      res.status(500).send('Something went wrong with getting patients')
    })
  },
  getPatient: (req, res) => {
    const db = req.app.get('db')
    const {id} = req.params

    db.get_patient(id)
    .then(results => {
      res.status(200).send(results)
    })
    .catch(err => {
      console.log(err)
      res.status(500).send('Something went wrong with getting patient by id')
    })
  },
  addPatient: (req,res) => {
    let db = req.app.get('db')
    let {name, age, sex, location, phone, active } = req.body

    db.add_patient([name, age, sex, location, phone, active])
    .then(results => {
      res.status(200).send(results)
    })
    .catch(err => {
      console.log(err)
      res.status(500).send('Something went wrong with adding patient')
    })
  },
  updatePatient: (req, res) => {
    let {id} = req.params
    let {name, age, sex, location, phone, active} = req.body
    let db = req.app.get('db')
    
    db.update_patient([name, age, sex, location, phone, active, id])
    .then(results => {
      res.status(200).send(results)
    })
    .catch(err => {
      console.log(err)
      res.status(500).send('Something went wrong with updating patient')
    })
  }, 
  updatePatientHealthworker: (req, res) => {
    let { patient_id, healthworker_id } = req.params
    let db = req.app.get('db')
    db.update_patient_healthworker([patient_id, healthworker_id]).then(results => {
      res.status(200).send(results)
    }).catch( err => {
      console.log('Error in adding healthworker to patient')
    })
  }
}