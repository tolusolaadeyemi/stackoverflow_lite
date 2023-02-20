const express = require('express');
const { auth, checkOwnership } = require('../middleware');
const { questionsController } = require('../controllers');
const { createQuestionValidator } = require('../validator/validator');

const router = express.Router();

/** @route      GET /api/v1/posts
 *  @desc       fetch all questions
 */
router.get('/', questionsController.getAllQuestions);

/** @route      GET /api/v1/posts/users/:id
 *  @desc       fetch all questions asked by the user
 */
 router.get('/users/:id', questionsController.getAllQuestionsbyUser);  

/** @route      GET /api/v1/posts/:id
 *  @desc       fetch a single post
 */
router.get('/:id', questionsController.getOneQuestion);

/** @route      GET /api/v1/posts/highest
 *  @desc       fetch question with the most answers
 */
 router.get('/highest/answers', questionsController.getHighestAnswer);


/** @route      POST /api/v1/posts/
 *  @desc       add a post
 */
router.post('/', auth, createQuestionValidator, questionsController.askQuestion);

/** @route      DELETE /api/v1/posts/:id
 *  @desc       delete a question (a user can only delete his/her own question)
 */
router.delete('/:id', auth, checkOwnership, questionsController.deleteQuestion);

/** @route      GET /api/v1/posts/search
 *  @desc       a user can search for a specific question
 */

 router.get('/post/search', questionsController.questionSearch);

module.exports = router;