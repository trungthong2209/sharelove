function formatAlert(message){
    return '<script>alert("'+message+'"); window.location.href = "javascript:history.back()"; </script>'
}
module.exports = formatAlert
