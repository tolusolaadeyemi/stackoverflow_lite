const { responseHandler } = require('../middleware');
const utils = require('../utils');

const { User, Answer, Comment, Vote, sequelize } = require('../models');

/**
 * @class Answers Services (logic)
 */

class AnswersService{
    static create = async (newAnswer) => {
        await sequelize.transaction(async (t) => {
        const answer = await Answer
        .create(
          {
              body: newAnswer.body,
              userId: newAnswer.userId,
              questionId: newAnswer.questionId,
          }, {transaction : t}
          )
          .catch((error) => {
              console.log(error.message);
              throw responseHandler(false, 500, error.message , null);
            })
            return answer.body;
        });
    
        
      };

      static upVoteCount = async (answerId) => await Vote
      .count({
        where: {
          answerId,
          vote_type: 'up'
        },
      }).catch((error) => {
        console.log(error);
        return responseHandler(false, 500, 'something went wrong!', null);
      });

      static downVoteCount = async (answerId) => await Vote
      .count({
        where: {
          answerId,
          vote_type: 'down'
        },
      }).catch((error) => {
        console.log(error);
        return responseHandler(false, 500, 'something went wrong!', null);
      });

      static commentCount = async (answerId) => await Comment
      .count({
        where: {
          answerId,
        },
      }).catch((error) => {
        console.log(error);
        return responseHandler(false, 500, 'something went wrong!', null);
      });


    static getAllAnswers = async (postId) => {
    const queryResult = await Answer
    .findAll({
            where: {
                questionId: postId,
                },
                attributes: [
                'id',
                'uuid',
                'questionId',
                'body',
                'createdAt',
                'status',
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
        
        const queryResultMap = queryResult.map((answer) => utils.array.sequelizeResponse(
            answer,
            'id',
            'uuid',
            'questionId',
            'body',
            'createdAt',
            'status',
            'username',
        ));
        
        if (utils.conditional.isArrayEmpty(queryResultMap)) {
            console.log('error: ', 'there are no answers to this question yet');
            throw responseHandler(false, 404, 'there are no answers to this question yet', null);
        }

        const upVoteCount = await this.upVoteCount(queryResultMap[0].id);
        const downVoteCount = await this.downVoteCount(queryResultMap[0].id);
        const commentCount = await this.commentCount(queryResultMap[0].id);

        const response = {
         answers: {
          ...queryResultMap,
          upvotes: upVoteCount,
          downvotes: downVoteCount,
          comment_count: commentCount,
         }
        }
        
        return response;
        };
          

        static acceptAnswer = async (id) => {
            const newStatus = await Answer
            .findOne({
              where: { id },
            })
            .catch((error) => {
                console.log(error.message);
                throw responseHandler(false, 404, 'this answer doesn\'t exist', null);
              });

            await newStatus.update({
                status : 'accepted'
            })
            await newStatus.save()
                return true;
          };
          

}

module.exports = AnswersService;