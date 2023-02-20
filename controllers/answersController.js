const { answersService } = require('../services');
const { errorHandler, asyncHandler, controllerResponseHandler } = require('../middleware');


/**
 * @class Answers Controller
 */

class AnswersController{    
    static addAnswer = asyncHandler(async (req, res) => {
        try {
            const answer = ({

                body: req.body.body,
                userId: req.user.id,
                questionId: req.params.id,

            });
            await answersService.create(answer)
            return controllerResponseHandler(res,true, 201, 'answer added', answer.body);
        } catch (err) {
            console.log(err);
            return errorHandler(err, req, res);
        }
});

    static getAllAnswers = asyncHandler(async (req, res) => {
        try {
        const data = await answersService.getAllAnswers(req.params.id)
        return controllerResponseHandler(res,true, 200, 'success', data);
        } catch (err) {
        console.log(err);
        return errorHandler(err, req, res);
        }

  });


    static acceptAnswer = asyncHandler(async (req, res) => {
        try {
        const data = await answersService.acceptAnswer(req.params.id)
        return controllerResponseHandler(res,true, 200, 'answer accepted', data);
        } catch (err) {
        console.log(err);
        return errorHandler(err, req, res);
        }

    });

    
}

module.exports = AnswersController;