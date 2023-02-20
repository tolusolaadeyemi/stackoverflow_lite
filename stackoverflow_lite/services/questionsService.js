
const Sequelize = require('sequelize');
const { responseHandler } = require('../middleware');
const utils = require('../utils');

const { Question, User, Answer, sequelize } = require('../models');
const Op = Sequelize.Op;

/**
 * @class Questions Services (logic)
 */

class QuestionsService{
    static create = async (newQuestion) => {
        await sequelize.transaction(async (t) => {
        const post = await Question
        .create(
          {
              title: newQuestion.title,
              body: newQuestion.body,
              userId: newQuestion.userId
          }, {transaction : t}
          )
          .catch((error) => {
              console.log(error.message);
              throw responseHandler(false, 500, 'something went wrong, question not added', null);
            })
            return post;
        });
    
        
      };

    static getAllQuestions = async () => {
        const query = {
            distinct: true,
            attributes: [
            'id',
            'uuid',
            [sequelize.literal('User.username'), 'username'],
            'createdAt',
            'updatedAt',
            'title',
            'body',
            ],
            include: [
              {
                model: User,
                required: false,
                attributes: [],
              },
            ],
            order: [['createdAt', 'DESC']],
          };
        
        
          const posts = await Question
            .findAll(query)
            .catch((error) => {
              console.log(error);
              result(responseHandler(false, 500, 'something went wrong', null), null);
            });
        
          const postsMap = posts.map((post) => utils.array.sequelizeResponse(
            post,
            'id',
            'uuid',
            'title',
            'body',
            'username',
            'createdAt',
            'updatedAt',
          ));
        
          if (utils.conditional.isArrayEmpty(postsMap)) {
            throw new Error('there are no posts at the moment');
          }
        
          return postsMap;
        };


      static answerCount = async (postId) => await Answer
      .count({
        where: {
          questionId: postId,
        }
      }).catch((error) => {
        console.log(error);
        return responseHandler(false, 500, 'something went wrong!', null);
      });


    static getOneQuestion = async (postId) => {
        let queryResult = await Question
        .findOne({
            distinct: true,
            where: {
            id: postId,
            },
            attributes: [
            'uuid',
            [sequelize.literal('user.username'), 'username'],
            'title',
            'body',
            'createdAt',
            'updatedAt',
            ],
            include: [
            {
                model: User,
                required: false,
                attributes: [],
            },
            ],
        }).catch((error) => {
            console.log(error);
            throw responseHandler(false, 500, 'something went wrong', null);
        });

        if ((!queryResult)) {
          throw responseHandler(false, 404, 'there isn\'t any post with this id', null);
        }
        

        queryResult = utils.array.sequelizeResponse(
            queryResult,
            'uuid',
            'username',
            'title',
            'body',
            'createdAt',
            'updatedAt',
        );

        const answerCount = await this.answerCount(postId);
  

        const response = {
            ...queryResult,
            answer_count: answerCount,
          };
        
          return response;
};

    static deleteQuestion  = async (postId) => {
        await sequelize.transaction(async (t) => {
        await Question
        .destroy({ where: { id: postId } }, { transaction: t })
        .catch((error) => {
            console.log(error);
            throw new Error(`we were unable to delete your post: ${error}`);
        });
    }
)};

  static getAllQuestionsbyUser = async (userId) => {
    const query = {
        distinct: true,
        where: {
          userId,
          },
        attributes: [
        'uuid',
        [sequelize.literal('user.username'), 'username'],
        'createdAt',
        'updatedAt',
        'title',
        'body',
        ],
        include: [
          {
            model: User,
            required: false,
            attributes: [],
          },
        ],
        order: [['createdAt', 'DESC']],
      };
    
    
      const posts = await Question
        .findAll(query)
        .catch((error) => {
          console.log(error);
          throw responseHandler(false, 500, 'something went wrong', null);
        });
    
      const postsMap = posts.map((post) => utils.array.sequelizeResponse(
        post,
        'uuid',
        'title',
        'body',
        'username',
        'createdAt',
        'updatedAt',
      ));
    
      if (utils.conditional.isArrayEmpty(postsMap)) {
        throw new Error('there are no posts by this user');
      }
    
      return postsMap;
    };

    static getHighestAnswer = async () => {
      const data = await sequelize.query("SELECT questionId, COUNT(questionId) AS highestanswers FROM answers GROUP BY questionId HAVING COUNT(questionId) = (SELECT MAX(mycount) AS highest_total FROM (SELECT questionId, COUNT(questionId) AS mycount FROM answers GROUP BY questionId) AS q)", { type: sequelize.QueryTypes.SELECT })
        .catch((error) => {
          console.log(error);
          return result(null,responseHandler(false, 500, 'something went wrong!', null));
        })

        let getQuestionBody = await Question
        .findOne({
          distinct: true,
          where: {
          id: data[0].questionId,
          },
          attributes: [
          [sequelize.literal('user.username'), 'username'],
          'title',
          'body',
          'createdAt',
          ],
          include: [
          {
              model: User,
              required: false,
              attributes: [],
          },
          ],
        })
       getQuestionBody = utils.array.sequelizeResponse(
          getQuestionBody,
          'username',
          'title',
          'body',
          'createdAt',
      );

      let getAnswers = await Answer
        .findAll({
          where: {
          questionId: data[0].questionId,
          },
          attributes: [
          [sequelize.literal('user.username'), 'username'],
          'body',
          'status',
          'createdAt',
          ],
          include: [
          {
              model: User,
              required: false,
              attributes: [],
          },
          ],
        })
       const getAnswersMap = getAnswers.map((getAnswers) => utils.array.sequelizeResponse(
          getAnswers,
          'username',
          'body',
          'status',
          'createdAt',
      ));

        const payload = {
          questionWithMostAnswers: {
            id: data[0].questionId,
            answers: data[0].highestanswers,
            ...getQuestionBody,
            getAnswersMap
          },
        };
        return payload;;

}

static questionSearch = async (searchQuery) => {
    const questions = await Question
      .findAll({
        where: {
          title : {
            [Op.like]: `%${searchQuery}%`
          }
        }
      })
      .catch((error) => {
        console.log(error);
        result(responseHandler(false, 500, 'something went wrong', null), null);
      });
  
    const resultsMap = questions.map((question) => utils.array.sequelizeResponse(
      question,
      'uuid',
      'title',
      'body',
      'username',
      'createdAt',
      'updatedAt',
    ));
  
    if (utils.conditional.isArrayEmpty(resultsMap)) {
      throw new Error('there are no posts that match your search');
    }
  
    return resultsMap;
  };

}


module.exports = QuestionsService;