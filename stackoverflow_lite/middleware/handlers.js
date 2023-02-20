
  
  const asyncHandler = (fn) => (req, res, next) => Promise
  .resolve(fn(req, res, next))
  .catch((error) => {
    console.log(error);
    responseHandler(false, 500, 'something went wrong', null);
  });


const controllerResponseHandler = (res, success, code, message, data) => {
   res.status(code).json({ 
    success,
    code,
    message,
    data,

  })
};

const responseHandler = (success, code = 400, message = 'valid', data) => ({
  success,
  code,
  message,
  data,
});


const errorHandler = (err, req, res) => {
  console.log('error handler', err)
  res.status(err.code || 500).json({
    success: false,
    code: err.code || 500,
    message: err.message || 'server error',
    data: null,
  });
};
;


module.exports = {
  responseHandler,
  asyncHandler,
  errorHandler,
  controllerResponseHandler
};

