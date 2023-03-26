module.exports = {
  resourceError(res, msg) {
    res.status(404).json({
      Message: msg
    })
  },
  serverError(res, error) {
    console.log(error);
    res.status(500).json({
      Message: `Internel server error`
    })
  }
}