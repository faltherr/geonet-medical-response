module.exports = {
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
  addHealthworker: (req,res) => {
    let db = req.app.get('db')
    let {name, phone, outpost_id, email, latitude, longitude, location} = req.body

    db.add_healthworker([name, phone, outpost_id, email, latitude, longitude, location])
    .then(results => {
      res.status(200).send(results)
    })
    .catch(err => {
      console.log(err)
      res.status(500).send('Something went wrong with adding healthworker')
    })
  }, 
  updateHealthworker: (req, res) => {
    let { id } = req.params
    let {name, phone, email, location, in_field} = req.body
    let db = req.app.get('db')

    db.update_healthworker([id, name, phone, email, location, in_field]).then( results => {
      res.status(200).send(results)
    })
    .catch( err => {
      console.log(err, 'Error with updating patients')
    })
  }
}