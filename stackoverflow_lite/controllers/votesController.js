const { votesService } = require('../services');
const { errorHandler, controllerResponseHandler, asyncHandler } = require('../middleware');


/**
 * @class Votes Controller
 */

class VotesController{
    static castVote = asyncHandler(async (req, res) => {
        try {
            const vote = ({

                vote_type: req.body.vote_type,
                userId: req.user.id,
                answerId: req.params.id,

            });
            await votesService.castVote(vote)
            return controllerResponseHandler(res,true, 201, 'your vote was recorded', `you gave this answer a/an ${vote.vote_type} vote`);
        } catch (err) {
            console.log(err);
            return errorHandler(err, req, res);
        }
});

}

module.exports = VotesController;