console.log('testing')
$(function(){
  $.validator.setDefaults({
    // onkeyup: false
  })

  // $.validator.addMethod('name', rule, message)

  $('#testForm').validate({
    rules: {
      inputOne: {
        required: true,
        lettersonly: true
      }
    }
  })
})