const express = require('express');
// You will need `users-model.js` and `posts-model.js` both
const User = require('./users-model');
const Post = require('../posts/posts-model');

// const Post = require('../posts/posts-model');

// The middleware functions also need to be required
const {logger,
  validateUserId,
  validateUser,
  validatePost
} = require('../middleware/middleware');


const router = express.Router();

router.get('/', logger, async (req, res, next) => {
  try{
    const users = await User.get();
    res.status(200).json(users);
  } catch(err) {
    next(err);
  }
});

router.get('/:id', logger, validateUserId, async (req, res, next) => {
  try {
    res.status(200).json(req.user);
  } catch (err) {
    next(err);
  }
});

router.post('/', logger, validateUser, async (req, res, next) => {
  try {
    const newUser = await User.insert(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', logger, validateUserId, validateUser, async (req, res, next) => {
  try {
    const updatedUser = await User.update(req.params.id, req.body);
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', logger, validateUserId, async (req, res, next) => {
  try {
    const {id} = req.params;
    await User.remove(id);
    res.status(200).json(req.user);
  } catch (err) {
    next(err);
  }
});

router.get('/:id/posts', logger, validateUserId, async (req, res, next) => {
  try {
    const posts = await User.getUserPosts(req.params.id);
    res.status(200).json(posts);
  } catch (err) {
    next(err);
  }
});

router.post(
  '/:id/posts', 
  logger, 
  validateUserId, 
  validatePost, 
  async (req, res, next) => {
    try {
      const newPost = await Post.insert({
        user_id: req.params.id,
        text: req.body.text
      });
      res.status(201).json(newPost);
    } catch (err) {
      next(err);
    }
});

router.use((error, req, res, next) => {
  const {status, message} = error;
  res.status(status || 500).json({message} || {message: 'fatal error'});
});

// do not forget to export the router
module.exports = router;