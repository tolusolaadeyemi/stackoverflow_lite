const { responseHandler } = require('../middleware');

const { Vote, sequelize } = require('../models');

/**
 * @class Votes Services (logic)
 */

class VotesService{
    static castVote = async (newVote) => {
        await sequelize.transaction(async (t) => {
        const vote = await Vote
        .create(
          {
              vote_type: newVote.vote_type,
              userId: newVote.userId,
              answerId: newVote.answerId, 
          }, {transaction : t}
          )
          .catch((error) => {
              console.log(error.message);
              throw responseHandler(false, 500, error.message , null);
            })
            return vote;
        });
    
        
      };
}

module.exports = VotesService;