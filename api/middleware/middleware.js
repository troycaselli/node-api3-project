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
  const {name} = req.body;
  console.log(name);
  if(
    name !== undefined 
    && typeof name === 'string' 
    && name.trim().length
  ) {
    next();
  } else {
    console.log('bad');
    next({status: 400, message: 'missing required name field'});
  }
}

function validatePost(req, res, next) {
  const {text, user_id} = req.body;
  console.log(text, user_id);
  if(text !== undefined && user_id !== undefined) {
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