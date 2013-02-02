function logErrors (err,req,res,next) {
  console.log(err.stack);
  next(err);
}

module.exports = logErrors;
