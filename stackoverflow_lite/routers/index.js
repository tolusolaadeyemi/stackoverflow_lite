const express = require('express');
const router = express.Router();
const usersRouter = require('./usersRouter');
const questionsRouter = require('./questionsRouter');
const answersRouter = require('./answersRouter');
const votesRouter = require('./votesRouter');
const commentsRouter = require('./commentsRouter');



router.use('/users', usersRouter);
router.use('/posts', questionsRouter);
router.use('/posts/answers', answersRouter);
router.use('/posts/answers/votes', votesRouter);
router.use('/posts/answers/comments', commentsRouter);


module.exports = router;

