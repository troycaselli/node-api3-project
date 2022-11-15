const express = require('express');
// You will need `users-model.js` and `posts-model.js` both
const User = require('./users-model');

// const Post = require('../posts/posts-model');

// The middleware functions also need to be required
const {logger,
  validateUserId,
  validateUser,
  validatePost
} = require('../middleware/middleware');


const router = express.Router();

router.get('/', logger, async (req, res) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  const users = await User.get();
  res.status(200).json(users);
});

router.get('/:id', logger, validateUserId, async (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  const user = await User.getById(req.params.id);
  res.status(200).json(user);
});

router.post('/', logger, validateUser, async (req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  const newUser = await User.insert(req.body);
  res.status(201).json(newUser);
});

router.put('/:id', logger, validateUserId, validateUser, async (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  const updatedUser = await User.update(req.params.id, req.body);
  res.status(200).json(updatedUser);
});

router.delete('/:id', logger, validateUserId, async (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  const {id} = req.params;
  const deletedUser = await User.getById(id);
  await User.remove(id);
  res.status(200).json(deletedUser);
});

router.get('/:id/posts', logger, validateUserId, (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
});

router.post('/:id/posts', logger, validateUserId, validatePost, (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.use((error, req, res, next) => {
  const {status, message} = error;
  res.status(status).json({message});
});

// do not forget to export the router
module.exports = router;