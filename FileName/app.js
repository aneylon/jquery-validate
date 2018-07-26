$.validator.addMethod('windowsfilename', windowsfilename, 'must be valid windows file name')

$('#fileName').validate({
  rules: {
    nameOfFile: {
      required: true,
      windowsfilename: true
    }
  }
})

function windowsfilename(value){
  return /^[^/\\:*?"<>|]+$/i.test(value)
}