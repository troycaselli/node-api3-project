const User = require('../users/users-model');

function logger(req, res, next) {
  req.timestamp = Date();
  console.log(req.method, req.url, req.timestamp);
  next();
}

async function validateUserId(req, res, next) {
  const user = await User.getById(req.params.id);
  if(user) {
    req.user = user;
    next();
  } else {
    next({status: 404, message: 'user not found'});
  }
}

function validateUser(req, res, next) {
  const {name} = req.body;
  if(name && name.trim().length) {
    next();
  } else {
    next({status: 400, message: 'missing required name field'});
  }
}

// removed user_id
function validatePost(req, res, next) {
  const {text} = req.body;
  if(text && text.trim().length) {
    next();
  } else {
    next({status: 400, message: 'missing required text field'});
  }
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
}