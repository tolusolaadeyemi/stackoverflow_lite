const express = require('express');
const { auth } = require('../middleware');
const { answersController } = require('../controllers');
const { createAnswerValidator } = require('../validator/validator');

const router = express.Router();

/** @route      GET /api/v1/posts/answers/:id
 *  @desc       fetch all answers of a post
 */
router.route('/:id')
  .get(answersController.getAllAnswers);

/** @route      POST /api/v1/posts/answers/:id
 *  @desc       add an answer to a post
 */
router.route('/:id')
  .post(
    auth, createAnswerValidator,
    answersController.addAnswer,
  );

/** @route      PUT /api/v1/posts/answers/accept/:id
 *  @desc       accept an answer to a post
 */
 router.route('/accept/:id')
 .put(
   auth,
   answersController.acceptAnswer,
 );

module.exports = router;