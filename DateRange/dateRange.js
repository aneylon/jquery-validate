console.log('testing')
  $.validator.setDefaults({
    // onkeyup: false
  })

  var maxDays = 7
  var dateRangeMessage = "Dates cannot be more than " + maxDays + " days apart"

  var isInRangeOfEnd = function (input) {
    var enteredEndDate = $('#endDate').val() // if empty string
    if(enteredEndDate === '' || input === '') return false // early out for empty fields
    var parsedEnteredEndDate = Date.parse(enteredEndDate)
    var parsedInputStartDate = Date.parse(input)
    var diff = parsedEnteredEndDate - parsedInputStartDate

    console.log('eed', enteredEndDate, 'input', input)
    console.log('peed', parsedEnteredEndDate, 'input', parsedInputStartDate)
    console.log(input, typeof input)
    console.log('diff', diff)
    if(diff <= maxDays)
      return true
    else
      return false
  }

  var isInRangeOfStart = function (input) {
    var enteredStartDate = $('#startDate').val() // if empty string
    if(enteredStartDate === '' || input === '') return false // early out for empty fields
    var parsedEnteredStartDate = Date.parse(enteredStartDate)
    var parsedInputEndDate = Date.parse(input)
    var diff = parsedInputEndDate - parsedEnteredStartDate

    console.log('esd', enteredStartDate, 'input', input)
    console.log('pesd', parsedEnteredStartDate, 'input', parsedInputEndDate)
    console.log(input, typeof input)
    console.log('diff', diff)
    if(diff <= maxDays)
      return true
    else
      return false
  }

  $.validator.addMethod('isInRangeOfStart', isInRangeOfStart, dateRangeMessage)
  $.validator.addMethod('isInRangeOfEnd', isInRangeOfEnd, dateRangeMessage)
  
  $('#dateRangeForm').validate(
  // {
  //   rules: {
  //     startDate: {
  //       isInRangeOfEnd: true,
  //     },
  //     endDate: {
  //       isInRangeOfStart: true,
  //     }
  //   }
  // }
)

$('#startDate').rules('add', {isInRangeOfEnd: true})
$('#endDate').rules('add', {isInRangeOfStart: true})
