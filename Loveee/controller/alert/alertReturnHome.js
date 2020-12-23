function alertReturnHome(message, url){
    return '<script>alert("'+message+'"); window.location.href = "'+url+'"; </script>'
}
module.exports = alertReturnHome
