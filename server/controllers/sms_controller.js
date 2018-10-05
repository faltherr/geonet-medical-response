const surveyQs = require('./data/survey_questions')
const surveyLogic = require('./functions/surveyLogic')
const twilio = require('twilio')
const MessagingResponse = twilio.twiml.MessagingResponse

module.exports = {
    emergency: (request, res) => {
        const client = twilio(process.env.accountSid, process.env.authToken);

        // Respond function to convert text to TwiML content to reply to user

        function respond(message) {
            var twiml = new MessagingResponse();
            twiml.message(message);
            res.type('text/xml');
            res.send(twiml.toString());
        }

        let { Body, From } = request.body
        let db = request.app.get('db')
        
        // This is the emergency response functionality
        if (Body.toLowerCase().match(/^.*(emergency).*$/)) {
            // db.alertStatus(From).then(emergencyResponse => {
            db.get_patient_by_phone(From).then(patientData => {
                // console.log("patient data", patientData)
                // HMMMMM ASYNC????
                client.messages
                        .create({
                            body: `Your patient ${patientData[0].name} has requested assistance at ${patientData[0].location}`,
                            from: process.env.TwilioSMSPhone,
                            to: patientData[0].healthworker_phone
                        }).then(()=>{
                            db.alertStatus(From).then(emergencyResponse => {
                                // console.log('Emergency status!!!!', emergencyResponse)
                                respond(`Help is on the way, ${emergencyResponse[0].name}. Your health worker is coordinating a response for your address, ${emergencyResponse[0].location}`)
                            })
                        })
            })
                
          
            // This is the registration functionality
        } else if (Body.toLowerCase().match(/^.*(register|start).*$/)) {
            db.checkPhoneNumber(From).then(checkPhoneNumber => {
                if (checkPhoneNumber.length) {
                    // If the user resends register, lookup their survey and resend the question.
                    let objectArr = Object.values(checkPhoneNumber[0])
                    let firstNullIndex = objectArr.indexOf(null)
                    let questionToFill = Object.keys(checkPhoneNumber[0])[firstNullIndex]
                    surveyQs.forEach(element => {
                        if (questionToFill in element) {
                            return respond(`You\'re already registered. Please answer this question: ${Object.values(element)[0]}`)
                        }
                    })
                } else {
                    db.addPhone(From).then(() => {
                        db.sms_get_survey_id(From).then(grabbedSurveyID => {
                            db.sms_add_patient_hw_connection(grabbedSurveyID[0].id).then(() => {
                                return respond(`Your number has been added. Please complete our survey. ${surveyQs[0].name}`)
                            })
                        })
                    })
                }
            })
            // This is the survey functionality and check to see if the phone number is already registered
        } else {
            db.checkPhoneNumber(From).then(surveyNumberCheck => {
                if (surveyNumberCheck.length === 0) {
                    return respond('Did you mean to register for HealthGrids Field Service? Respond with "Register".')
                } else if (surveyNumberCheck[0].completed === true) {
                    return respond('You already completed the survey. Message us if there is an emergency with "emergency".')
                } else {
                    // Here we use the imported survey logic function to update DB and ask the correct question
                    surveyLogic(surveyNumberCheck, Body, From, db, respond)
                }
            })
        }
    }
}