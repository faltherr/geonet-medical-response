module.exports = {
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
  delete : (req, res) => {
    const db = req.app.get('db')
    const {id} = req.params
    db.delete_outposts([id]).then(response => {
      res.status(200).send({id})
    })
  },
  addOutpost : (req,res) => {
    let db = req.app.get('db')
    let {name, location, latitude, longitude} = req.body

    db.add_outpost([name, location, latitude, longitude])
    .then(results => {
      res.status(200).send(results)
    })
    .catch(err => {
      console.log(err)
      res.status(500).send('Something went wrong with adding healthworker')
    })
  }
}