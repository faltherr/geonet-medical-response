module.exports = {
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
  }
}