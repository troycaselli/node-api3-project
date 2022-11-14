const {getById} = require('../users/users-model');

function logger(req, res, next) {
  req.timestamp = Date.now();
  console.log(req.method, req.url, req.timestamp);
  next();
}

async function validateUserId(req, res, next) {
  console.log(req.params.id);
  const user = await getById(req.params.id);
  if(user) {
    req.user = user;
    next();
  } else {
    next({status: 404, message: 'user not found'});
  }
}

function validateUser(req, res, next) {
  next();
}

function validatePost(req, res, next) {
  next();
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
}