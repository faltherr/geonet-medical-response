module.exports = {
  patientDataChecker(patientData) {
    let currentPatientAlerts = []
    patientData.forEach(patient => {
    if (patient.alert === true) {
      currentPatientAlerts.push(patient)
    }

  })
  
  return currentPatientAlerts
  }
}