function clientErrorHandler(err,req,res,next) {
  if (req.xhr) {
    res.send(500,{error: 'Something blew up!'});
  } else {
    next(err);
  }
}

module.exports = clientErrorHandler;
