const { responseHandler, cschema } = require('../middleware');
const utils = require('../utils');

const { User, Comment, sequelize } = require('../models');

/**
 * @class Comments Services (logic)
 */

class CommentsService {
      static create = async (newComment) => {
        await sequelize.transaction(async (t) => {
        const comment = await Comment
        .create(
          {
              body: newComment.body,
              userId: newComment.userId,
              answerId: newComment.answerId,
          }, {transaction : t}
          )
          .catch((error) => {
              console.log(error.message);
              throw responseHandler(false, 500, error.message , null);
            })
            return comment.body;
        });
    
        
      };

    static getAllComments = async (answerId) => {
    const queryResult = await Comment
    .findAll({
            where: {
                answerId,
                },
                attributes: [
                'id',
                'uuid',
                'answerId',
                'body',
                'createdAt',
                [sequelize.literal('user.username'), 'username'],
            ],
            include: {
                model: User,
                attributes: [],
            },
        }).catch((error) => {
            console.log(error);
            throw responseHandler(false, 500, 'something went wrong!', null);
        });
        
        const queryResultMap = queryResult.map((comment) => utils.array.sequelizeResponse(
            comment,
            'id',
            'uuid',
            'answerId',
            'body',
            'createdAt',
            'username',
        ));
        
        if (utils.conditional.isArrayEmpty(queryResultMap)) {
            console.log('error: ', 'there are no comments on this answer yet');
            throw responseHandler(false, 404, 'there are no comments on this answer yet', null);
        }
        
        return  queryResultMap;
        };  

        static deleteQuestionComments = async (postId, t) => {
            await CommentsModel
              .destroy({ where: { post_id: postId } }, { transaction: t })
              .then(() => ({ status: true, message: 'Comment Removed' }))
              .catch((error) => {
                throw new Error(`comment delete operation failed: ${error}`);
              });
          };

}

module.exports = CommentsService;