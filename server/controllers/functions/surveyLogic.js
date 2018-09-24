const surveyQs = require('../data/survey_questions')
const axios = require('axios')

module.exports = async function surveyLogic(surveyNumberCheck, Body, From, db, respond) {

    // This variable maintains the status of a response as valid unless the response is invalid. 
    // If the response is invalid we will not send the next question (sendQuestion())
    let validResponse = true

    // ********** Determine what cell the message body should fill ********** //

    // We create a clone of the patient's object so that we can eliminate any columns that do not have a question in the survey.
    // Here we remove lat and long because we want them to be input by our request to what3words
    let clone = Object.assign({}, surveyNumberCheck[0])
    delete clone.latitude
    delete clone.longitude
    // objectArr holds the values of the current survey respondent
    // let objectArr = Object.values(surveyNumberCheck[0])
    let objectArr = Object.values(clone)

    //** The first null index should be identified as the value we want to insert into the table
    let firstNullIndex = objectArr.indexOf(null)
    
    //** Question to fill holds the key of the object at the first null value
    //** We will add this value to the database
    let questionToFill = Object.keys(clone)[firstNullIndex]

    // Here is the logic for checking to make sure the response type is accurate and will be added to our database correctly
    if (questionToFill === 'famplan' || questionToFill === 'illness' || questionToFill === 'hiv') {
        // For each question we want to make sure that the text returned is accurate
        // This regex matches the string 'yes' with a 1 character padding on either side in case the user enters "yes " or "1yes"
        if (Body.toLowerCase().match(/^.?(yes).?$/)) {
            let newObj = {}
            newObj[questionToFill] = 'yes';
            // The line below is a method from Massive that allows us to update a row
            // The first object passed in is like the where clause. Here we are saying where phone number is equal to the number FROM the SMS
            // The second object is the object specifying which column we want to update in the database (key) with what value (value)
            db.survey.update({ phone: From }, newObj).then(function (error, updatedDatabase) { })
            // The line below updates the first null index after a value has been returned so that the survey logic can be based off of the first null index following the database update
            objectArr[firstNullIndex] = 'yes'
        } else if (Body.toLowerCase().match(/^.?(no).?$/)) {
            // console.log('Add no')
            let newObj = {}
            newObj[questionToFill] = 'no';
            db.survey.update({ phone: From }, newObj).then(function (error, updatedDatabase) { })
            objectArr[firstNullIndex] = 'no'
        } else {
            // This is the template for all invalid responses apply this to each case where the response is invalid to resend the question.
            // console.log('Please answer question again')
            validResponse = false
            surveyQs.forEach(element => {
                if (questionToFill in element) {
                    return respond(`Please re-enter a valid answer. ${Object.values(element)[0]}`)
                }
            })
        }
    } else if (questionToFill === 'age') {
        // console.log('Body', typeof +Body)
        if (Number.isInteger(+Body) && Body >= 10 && Body <= 70) {
            let newObj = {}
            newObj[questionToFill] = Body;
            db.survey.update({ phone: From }, newObj).then(function (error, updatedDatabase) { })
            objectArr[firstNullIndex] = Body
        } else {
            validResponse = false
            surveyQs.forEach(element => {
                if (questionToFill in element) {
                    return respond(`Please re-enter a valid answer. ${Object.values(element)[0]}`)
                }
            })
        }
    } else if (questionToFill === 'parity') {
        if (Number.isInteger(+Body) && Body >= 0 && Body <= 20) {
            let newObj = {}
            newObj[questionToFill] = Body;
            db.survey.update({ phone: From }, newObj).then(function (error, updatedDatabase) { })
            objectArr[firstNullIndex] = Body
        } else {
            validResponse = false
            surveyQs.forEach(element => {
                if (questionToFill in element) {
                    return respond(`Please re-enter a valid answer. ${Object.values(element)[0]}`)
                }
            })
        }
    } else if (questionToFill === 'duedate') {
        let dateMatcher = /^([2][0][1-2][0-9])(\/|\-|\.)(0[1-9]|1[0-2]|[0-12])(\/|\-|\.)([0-31]|0[1-9]|1[0-9]|2[0-9]|3[0-1])$/
        if (Body.match(dateMatcher)) {
            // console.log('Your date is correct')
            let year = Body.match(dateMatcher)[1]
            let month = Body.match(dateMatcher)[3]
            let day = Body.match(dateMatcher)[5]
            let fullDueDate = `${year}/${month}/${day}`

            let newObj = {}
            newObj[questionToFill] = fullDueDate;
            db.survey.update({ phone: From }, newObj).then(function (error, updatedDatabase) { })
            objectArr[firstNullIndex] = fullDueDate
        } else {
            validResponse = false
            surveyQs.forEach(element => {
                if (questionToFill in element) {
                    return respond(`Please re-enter a valid answer. ${Object.values(element)[0]}`)
                }
            })
        }


    } else if (questionToFill === 'location') {
        let locationMatcher = new RegExp(/^([a-z]+)(\/|\.|\-)([a-z]+)(\/|\.|\-)([a-z]+)$/, 'i')
        if (Body.match(locationMatcher)) {
            // console.log(11111111111111, Body)
            let word1 = Body.match(locationMatcher)[1]
            let word2 = Body.match(locationMatcher)[3]
            let word3 = Body.match(locationMatcher)[5]

            let fullAddress = `${word1}.${word2}.${word3}`.toLowerCase()

            // Add the 3words api get request request here! Check for latitude/longitude bounds for Sierra Leone

            await axios.get(`https://api.what3words.com/v2/forward?addr=${fullAddress}&key=${process.env.w3w_key}`).then( res => {
                    if(!res.data.geometry) {
                    // return respond(`Address not found. Please enter a valid three word address in the format word1.word2.word3.`)
                    surveyQs.forEach(element => {
                        validResponse = false
                        if (questionToFill in element) {
                            return respond(`Address not found. Please re-enter a valid answer. ${Object.values(element)[0]}`)
                        }
                    })
                    } else if( +res.data.geometry.lng<-13.307377 || +res.data.geometry.lng>-10.256908 || +res.data.geometry.lat>10.0316 || +res.data.geometry.lat<6.791397) {
                        validResponse = false
                        return respond(`The address you entered was not in Sierra Leone. Please double check and send a message in the format 'word1.word2.word3'.`)
                    } else {
                        // This fills the longitude cell
                        let lngObj = {}
                        lngObj['longitude']=res.data.geometry.lng
                        db.survey.update({ phone: From }, lngObj)
                        //This fills the latitude cell
                        let latObj = {}
                        latObj['latitude']=res.data.geometry.lat
                        db.survey.update({ phone: From }, latObj)
                        //This fills the location cell
                        let newObj = {}
                        newObj[questionToFill] = fullAddress;
                        db.survey.update({ phone: From }, newObj)
                        objectArr[firstNullIndex] = fullAddress
                    }
                })
        } else {
            validResponse = false
            surveyQs.forEach(element => {
                if (questionToFill in element) {
                    return respond(`Please re-enter a valid answer. ${Object.values(element)[0]}`)
                }
            })
        }
    } else {
        //** This should be a DB Query for adding values to the database
        let newObj = {}
        newObj[questionToFill] = Body;
        db.survey.update({ phone: From }, newObj).then(function (error, updatedDatabase) { })
        objectArr[firstNullIndex] = Body
    }


    // // ********** Determine what question to send ********** //

    //** questionToSend holds the text associated with the key of the second null value
    //** We get the second null index

    //** We want to make sure that there is still a question to send

    // This code will find the number of null values then decide how to process the logic for setting a second null value

    function sendQuestion() {
        // null count identifies any unfilled cells in the survey
        let nullCount = objectArr.filter(function (value) {return value === null }).length
        // This is labeled "Next Null" because the first null value has been inserted into the database and the objectArr is updated
        // Basically the next null is the first null after the object arr from earlier was updated on a successful question entry
        let nextNullIndex = objectArr.indexOf(null)

        // When null count is equal to 0 the survey is completed
        if (nullCount === 0){
            db.survey.update({ phone: From }, {completed:true})
            respond('Survey has been completed. Message us if there is an emergency with "emergency".')
        } else {
            let questionToSend = Object.keys(clone)[nextNullIndex]
            surveyQs.forEach(element => {
                if (questionToSend in element) {
                    return respond(Object.values(element)[0])
                }
            })
        }
    }

    // Here we invoke the function that decides whether to send the next question of mark the survey as completed.
    // We do this based on the variable valid response defined at the top of the file

    if (validResponse){
        sendQuestion()
    } else {
        return null
    }
}