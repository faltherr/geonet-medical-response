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
  getHealthworkers: (req, res) => {
    const db = req.app.get('db')

    db.get_healthworkers()
    .then(results => {
      res.status(200).send(results)
    })
    .catch(err => {
      console.log(err)
      res.status(500).send('Something went wrong with getting healthworkers')
    })
  },
  getOutposts: (req, res) => {
    const db = req.app.get('db')

    db.get_outposts()
    .then(results => {
      res.status(200).send(results)
    })
    .catch(err => {
      console.log(err)
      res.status(500).send('Something went wrong with getting outposts')
    })
  },
  getSurveys: (req, res) => {
    const db = req.app.get('db')

    db.get_surveys()
    .then(results => {
      res.status(200).send(results)
    })
    .catch(err => {
      console.log(err)
      res.status(500).send('Something went wrong with getting surveys')
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
  getHealthworker: (req, res) => {
    const db = req.app.get('db')
    const {id} = req.params

    db.get_healthworker(id)
    .then(results => {
      res.status(200).send(results)
    })
    .catch(err => {
      console.log(err)
      res.status(500).send('Something went wrong with getting healthworker by id')
    })
  },
  getSurvey:(req,res) => {
    const db = req.app.get('db')
    const {id} = req.params

    db.get_survey(id)
    .then(results => {
      res.status(200).send(results)
    })
    .catch(err => {
      console.log(err)
      res.status(500).send('Something went wrong with getting survey by id')
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
  addHealthworker: (req,res) => {
    let db = req.app.get('db')
    let {name, phone, active, email} = req.body

    db.add_healthworker([name, phone, active, email])
    .then(results => {
      res.status(200).send(results)
    })
    .catch(err => {
      console.log(err)
      res.status(500).send('Something went wrong with adding healthworker')
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
  }
}