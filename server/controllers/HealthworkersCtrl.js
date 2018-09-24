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
    let {name, phone, active, email} = req.body

    db.add_healthworker([name, phone, active, email])
    .then(results => {
      res.status(200).send(results)
    })
    .catch(err => {
      console.log(err)
      res.status(500).send('Something went wrong with adding healthworker')
    })
  }
}