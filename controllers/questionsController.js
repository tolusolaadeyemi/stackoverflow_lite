const { questionsService } = require('../services');
const { controllerResponseHandler, asyncHandler, errorHandler } = require('../middleware');


/**
 * @class Questions Controller
 */

class QuestionsController{  
    static askQuestion = asyncHandler(async (req, res) => {
    try {
        const post = {

            title: req.body.title,
            body: req.body.body,
            userId: req.user.id,

        };
        await questionsService.create(post)
        return controllerResponseHandler(res,true, 201, 'post created', post.title);
    } catch (err) {
        console.log(err);
        return errorHandler(err, req, res);
    }
    });

    static getAllQuestions = asyncHandler(async (req, res, next) => {
        try {
          const data = await questionsService.getAllQuestions()
            return controllerResponseHandler(res,true, 200, 'success', data);
        } catch (err) {
          console.log(err);
          return errorHandler(err, req, res);
        }
    });

    static getOneQuestion = asyncHandler(async (req, res) => {
    try {
        const data = await questionsService.getOneQuestion(req.params.id)
        return controllerResponseHandler(res,true, 200, 'success', data);
    } catch (err) {
        console.log(err);
        return errorHandler(err, req, res);
    }
    });

    static getAllQuestionsbyUser = asyncHandler(async (req, res) => {
      try {
          const data = await questionsService.getAllQuestionsbyUser(req.params.id)
          return controllerResponseHandler(res,true, 200, 'success', data);
      } catch (err) {
          console.log(err);
          return errorHandler(err, req, res);
      }
      });

    static deleteQuestion = asyncHandler(async (req, res) => {
        try {
          await questionsService.deleteQuestion(req.params.id)
          return controllerResponseHandler(res,true, 200, 'post deleted', null);
        } catch (err) {
          console.log(err);
          return errorHandler(err, req, res);
        }
      });


      static getHighestAnswer = asyncHandler(async (req, res) => {
        try {
          const data = await questionsService.getHighestAnswer()
          return controllerResponseHandler(res,true, 200, 'success', data);
        } catch (err) {
          console.log(err);
          return errorHandler(err, req, res);
        }
      });

      static questionSearch = asyncHandler(async (req, res) => {
        try {
            const data = await questionsService.questionSearch(req.query.q)
            return controllerResponseHandler(res,true, 200, 'success', data);
        } catch (err) {
            console.log(err);
            return errorHandler(err, req, res);
        }
        });
}

module.exports = QuestionsController;