const express = require('express');
const { auth } = require('../middleware');
const { votesController } = require('../controllers');
const { createVoteValidator } = require('../validator/validator');

const router = express.Router();

/** @route      PUT /api/v1/posts/answers/votes/:id
 *  @desc       up/down vote an answer 
 */
 router.post('/:id', auth, createVoteValidator,votesController.castVote);


module.exports = router;