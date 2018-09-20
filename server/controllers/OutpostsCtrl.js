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
  }
}