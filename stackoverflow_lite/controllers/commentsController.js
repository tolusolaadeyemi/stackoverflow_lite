const { commentsService } = require('../services');
const { asyncHandler, controllerResponseHandler, errorHandler } = require('../middleware');


/**
 * @class Comments Controller
 */

class CommentsController{
    static addComment = asyncHandler(async (req, res) => {
        try {
            const comment = ({

                body: req.body.body,
                userId: req.user.id,
                answerId: req.params.id,

            });
            await commentsService.create(comment)
            return controllerResponseHandler(res,true, 201, 'comment added', comment.body);
        } catch (err) {
            console.log(err);
            return errorHandler(err, req, res);
        }
});

    static getAllComments = asyncHandler(async (req, res) => {
        try {
        const data = await commentsService.getAllComments(req.params.id)
        return controllerResponseHandler(res,true, 200, 'success', data);
        } catch (err) {
            console.log(err);
            return errorHandler(err, req, res);
        }

  });
    
}

module.exports = CommentsController;