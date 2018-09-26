

// let objArray = [{
//   age: 29,
//   alert: false,
//   completed: true,
//   duedate: "2018-11-21T07:00:00.000Z",
//   famplan: "no",
//   healthworker_id: 1,
//   healthworker_name: "Cody Tomesch",
//   hiv: "no",
//   id: 1,
//   latitude: "9.052973",
//   location: "duplicate.publications.workmanlike",
//   longitude: "-12.182162",
//   name: "Forest",
//   parity: 4,
//   phone: "+18312247565",
//   survey_id: 1
// },
// {
//   age: 24,
//   alert: true,
//   completed: true,
//   duedate: "2019-05-01T06:00:00.000Z",
//   famplan: "no",
//   healthworker_id: 1,
//   healthworker_name: "Cody Tomesch",
//   hiv: "no",
//   id: 2,
//   latitude: "9.179671",
//   location: "speedily.pregnant.nostrils",
//   longitude: "-11.402646",
//   name: "Billy",
//   parity: 0,
//   phone: "+18014584455",
//   survey_id: 2
// }, {
//   age: 30,
//   alert: false,
//   completed: true,
//   duedate: "2018-10-16T06:00:00.000Z",
//   famplan: "no",
//   healthworker_id: 2,
//   healthworker_name: "Harry Potter",
//   hiv: "yes",
//   id: 3,
//   latitude: "9.101593",
//   location: "spotted.exists.crowns",
//   longitude: "-12.179104",
//   name: "Fatmata",
//   parity: 8,
//   phone: "+53874783",
//   survey_id: 3
// }, {
//   age: 27,
//   alert: false,
//   completed: true,
//   duedate: "2018-11-20T07:00:00.000Z",
//   famplan: "no",
//   healthworker_id: null,
//   healthworker_name: null,
//   hiv: "no",
//   id: 20,
//   latitude: "9.54195",
//   location: "irrelevancy.trending.rattles",
//   longitude: "-11.353087",
//   name: "Aminata Triata",
//   parity: 4,
//   phone: "+2326571424761",
//   survey_id: null
// }, {
//   age: 18,
//   alert: false,
//   completed: true,
//   duedate: "2018-11-15T07:00:00.000Z",
//   famplan: "no",
//   healthworker_id: null,
//   healthworker_name: null,
//   hiv: "no",
//   id: 17,
//   latitude: "9.547205",
//   location: "outpatients.clog.designers",
//   longitude: "-11.382997",
//   name: "Adama Bantu",
//   parity: 7,
//   phone: "+2326371427761",
//   survey_id: null
// }, {
//   age: 21,
//   alert: false,
//   completed: true,
//   duedate: "2018-10-20T06:00:00.000Z",
//   famplan: "yes",
//   healthworker_id: null,
//   healthworker_name: null,
//   hiv: "yes",
//   id: 12,
//   latitude: "9.547394",
//   location: "streetlamps.insolently.surname",
//   longitude: "-11.384145",
//   name: "Aminata Kamara",
//   parity: 2,
//   phone: "+2326571457761",
//   survey_id: null
// }, {
//   age: 62,
//   alert: true,
//   completed: true,
//   duedate: "2019-09-18T06:00:00.000Z",
//   famplan: "yes",
//   healthworker_id: null,
//   healthworker_name: null,
//   hiv: "yes",
//   id: 10,
//   latitude: "8.460907",
//   location: "audits.guidance.chronicles",
//   longitude: "-11.779363",
//   name: "Cody ",
//   parity: 7,
//   phone: "+17574164169",
//   survey_id: null
// }, {
//   age: 20,
//   alert: false,
//   completed: true,
//   duedate: "2018-12-20T07:00:00.000Z",
//   famplan: "no",
//   healthworker_id: null,
//   healthworker_name: null,
//   hiv: "no",
//   id: 18,
//   latitude: "9.532759",
//   location: "fiery.junctions.hampering",
//   longitude: "-11.372061",
//   name: "Mariana Kamara",
//   parity: 2,
//   phone: "+2326571427661",
//   survey_id: null
// }, {
//   age: 27,
//   alert: false,
//   completed: true,
//   duedate: "2018-11-27T07:00:00.000Z",
//   famplan: "no",
//   healthworker_id: null,
//   healthworker_name: null,
//   hiv: "no",
//   id: 15,
//   latitude: "9.546154",
//   location: "fizzles.televised.guaranteed",
//   longitude: "-11.384692",
//   name: "Aminata Bangura",
//   parity: 2,
//   phone: "+2326571427769",
//   survey_id: null
// }, {
//   age: 14,
//   alert: false,
//   completed: true,
//   duedate: "2018-10-22T06:00:00.000Z",
//   famplan: "no",
//   healthworker_id: null,
//   healthworker_name: null,
//   hiv: "yes",
//   id: 13,
//   latitude: "9.546774",
//   location: "initial.dropouts.mammalian",
//   longitude: "-11.384419",
//   name: "Aminata Sesay",
//   parity: 2,
//   phone: "+2326571437761",
//   survey_id: null
// }, {
//   age: 32,
//   alert: false,
//   completed: true,
//   duedate: "2018-09-29T06:00:00.000Z",
//   famplan: "no",
//   healthworker_id: null,
//   healthworker_name: null,
//   hiv: "no",
//   id: 21,
//   latitude: "9.546019",
//   location: "unity.smoother.track",
//   longitude: "-11.406373",
//   name: "Georgieta Kanu",
//   parity: 2,
//   phone: "+2326571427861",
//   survey_id: null
// }]

// function ageCounter(objArray) {
//   let ageArray = []
//   for (let i = 0; i < objArray.length; i++) {
//     if (objArray[i].age) {
//       ageArray.push(objArray[i].age)
//     }
//   }
//   return ageArray
// }
// console.log(ageCounter(objArray))

// function parityCounter(objArray) {
//   let parityCounter = []
//   for (let i = 0; i < objArray.length; i++) {
//     if (objArray[i].parity || objArray[i].parity === 0) {
//       parityCounter.push(objArray[i].parity)
//     }
//   }
//   return parityCounter
// }
// console.log(parityCounter(objArray))
// function loop (objArray) {
//   let yesCounter = 0
//   for(let i = 0; i < objArray.length; i++){
//     if(objArray[i].hiv === "yes"){
//       yesCounter++
//     }
//   }
//   return yesCounter
// }
// console.log(loop(objArray))

// function secondLoop (objArray) {
//   let noCounter = 0
//   for(let i = 0; i < objArray.length; i++){
//     if(objArray[i].hiv === "no"){
//       noCounter++
//     }
//   }
//   return noCounter
// }
// console.log(secondLoop(objArray))

// let total = (loop(objArray) + secondLoop(objArray))
// console.log(total)
// let yesMath = (loop(objArray) / total) * 100 + "%"
// console.log(yesMath)
// let noMath = (secondLoop(objArray) / total) * 100 + "%"
// console.log(noMath)



// function thirdLoop (objArray) {
//   let yesCounterTwo = 0
//   for(let i = 0; i < objArray.length; i++){
//     if(objArray[i].famplan === "yes"){
//       yesCounterTwo++
//     }
//   }
//   return yesCounterTwo
// }
// // console.log(thirdLoop(objArray))

// function fourthLoop (objArray) {
//   let noCounterTwo = 0
//   for(let i = 0; i < objArray.length; i++){
//     if(objArray[i].famplan === "no"){
//       noCounterTwo++
//     }
//   }
//   return noCounterTwo
// }
// // console.log(fourthLoop(objArray))

// let totalTwo = (thirdLoop(objArray) + fourthLoop(objArray))
// console.log(totalTwo)
// let yesMathTwo = (thirdLoop(objArray) / totalTwo) * 100 + "%"
// console.log(yesMathTwo)
// let noMathTwo = (fourthLoop(objArray) / totalTwo) * 100 + "%"
// console.log(noMathTwo)
let maternal = [
  {
    url: 'https://redalert.bsvgateway.org/api/indicator_series/859425/?format=json',
    indicator: 'https://redalert.bsvgateway.org/api/indicator/SH_STA_MMRT/?format=json',
    indicator_name: 'Maternal mortality ratio (modeled estimate, per 100,000 live births)',
    topic: 'Millennium Development Goals',
    location: 'https://redalert.bsvgateway.org/api/locations/122993951/?format=json',
    location_name: 'Sierra Leone',
    source: {
      reference: {
        url: 'http://databank.worldbank.org/data/download/MDG_csv.zip',
        reference_id: 'World Bank, Millennium Development Goals',
        name: 'World Bank, Millennium Development Goals indicator data'
      },
      pull_date: '2018-09-17T16:20:38.649000'
    },
    series: [
      {
        start: '2000-01-01T00:00:00',
        end: '2001-01-01T00:00:00',
        value: 2650
      },
      {
        start: '2001-01-01T00:00:00',
        end: '2002-01-01T00:00:00',
        value: 2530
      },
      {
        start: '2002-01-01T00:00:00',
        end: '2003-01-01T00:00:00',
        value: 2390
      },
      {
        start: '2003-01-01T00:00:00',
        end: '2004-01-01T00:00:00',
        value: 2270
      },
      {
        start: '2004-01-01T00:00:00',
        end: '2005-01-01T00:00:00',
        value: 2110
      },
      {
        start: '2005-01-01T00:00:00',
        end: '2006-01-01T00:00:00',
        value: 1990
      },
      {
        start: '2006-01-01T00:00:00',
        end: '2007-01-01T00:00:00',
        value: 1880
      },
      {
        start: '2007-01-01T00:00:00',
        end: '2008-01-01T00:00:00',
        value: 1800
      },
      {
        start: '2008-01-01T00:00:00',
        end: '2009-01-01T00:00:00',
        value: 1730
      },
      {
        start: '2009-01-01T00:00:00',
        end: '2010-01-01T00:00:00',
        value: 1680
      },
      {
        start: '2010-01-01T00:00:00',
        end: '2011-01-01T00:00:00',
        value: 1630
      },
      {
        start: '2011-01-01T00:00:00',
        end: '2012-01-01T00:00:00',
        value: 1580
      },
      {
        start: '2012-01-01T00:00:00',
        end: '2013-01-01T00:00:00',
        value: 1510
      },
      {
        start: '2013-01-01T00:00:00',
        end: '2014-01-01T00:00:00',
        value: 1460
      },
      {
        start: '2014-01-01T00:00:00',
        end: '2015-01-01T00:00:00',
        value: 1410
      },
      {
        start: '2015-01-01T00:00:00',
        end: '2016-01-01T00:00:00',
        value: 1360
      }
    ]
  }
]

// let todayUnformatted = new Date()
// let today = moment(todayUnformatted).format('YYYY')
// let maternalDate = moment()

function looper(maternal) {
  var dates = []
  for (let i = 0; i < maternal[0].series.length; i++) {
    if (maternal[0].series[i].end && maternal[0].series[i].value) {
      var date = maternal[0].series[i].end
      var stringDate = +date.substring(0,4)
      var mortality = maternal[0].series[i].value
      dates.push({date: stringDate, value: mortality})
    }
  }
  return dates
}


console.log(looper(maternal))

function values(maternal) {
  let values = 0
  for (let i = 0; i < maternal[0].series.length; i++) {
    if (maternal[0].series[i].value) {
      values++
    }
  }
  return values
}
console.log(values(maternal))