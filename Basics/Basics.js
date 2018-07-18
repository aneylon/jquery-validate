console.log('basics')
$('#formProperties').validate()

$('#jsForm').validate({
  rules: {
    thingOne: {
      required: true,
      minlength: 2
    }
  },
  messages: {
    thingOne: {
      required: 'Please enter thing one.',
      minlength: 'Must be longer than two characters'
    }
  }
})