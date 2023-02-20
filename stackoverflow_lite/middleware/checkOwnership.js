const { responseHandler } = require('./handlers');
const { Question, Answer , Comment } = require('../models');

const checkOwnership = async (req, res, next) => {
  let Model;
  if (req.originalUrl.includes('posts')) {
    if (req.originalUrl.includes('answers')) {
      Model = Answer;
    } else if (req.originalUrl.includes('comments')) {
      Model = Comment;
    } else {
      Model = Question;
    }
  } else {
    next();
  }

  const user = await Model
    .findOne({
      where: { id: req.params.id },
      attributes: ['userId'],
    })
    .catch((error) => {
      console.log(error);
      return res
        .status(500)
        .json(responseHandler(false, 500, 'something went wrong', null));
    });


  if (!user) {
    return res
      .status(404)
      .json(responseHandler(false, 404, 'user doesn\'t exist', null));
  }

  if (user.userId !== req.user.id) {
    return res.json(
      responseHandler(
        false,
        401,
        'user not authorized to delete this post',
        null,
      ),
    );
  }

  next();
};

module.exports = checkOwnership;