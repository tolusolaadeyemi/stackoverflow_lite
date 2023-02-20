const express = require('express');
const { auth } = require('../middleware');
const { commentsController } = require('../controllers');
const { createCommentValidator } = require('../validator/validator');

const router = express.Router();

/** @route      GET /api/v1/posts/answers/comments/:id
 *  @desc       fetch all comments of a post
 */
router.get('/:id',commentsController.getAllComments);

/** @route      POST /api/v1/posts/answers/comments/:id
 *  @desc       add a comment to a post
 */
router.post('/:id', auth, createCommentValidator, commentsController.addComment,
  );

module.exports = router;