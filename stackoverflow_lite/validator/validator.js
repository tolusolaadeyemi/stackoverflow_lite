const { controllerResponseHandler } = require('../middleware');

const Joi = require('joi');

const schema = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9$@#&!]{6,12}$'))
        .required(),
});

const qschema = Joi.object({    
    title: Joi.string()
        .min(15)
        .max(140)
        .required(),

    body: Joi.string()
        .min(30)
        .max(1000)
        .required(),
});

const aschema = Joi.object({
    body: Joi.string()
        .min(20)
        .max(1000)
        .required(),
});

const cschema = Joi.object({
    body: Joi.string()
        .min(20)
        .max(1000)
        .required(),
});

const vschema = Joi.object({
    vote_type: Joi.string()
        .valid('up', 'down')
        .required(),
});


const createUserValidator = (req, res, next) => {
    try {
        const value = schema.validate(req.body).value;
        req.body = value;
        next();
    } catch (error) {
        console.log(error.message);
        controllerResponseHandler(res, false, 400, error.message.replace(/[\"]/gi, ''), null)
    }
}

const createQuestionValidator = (req, res, next) => {
    try {
            const value = qschema.validate(req.body).value;
            req.body = value;
            next();
    } catch (error) {
        console.log(error.message);
        controllerResponseHandler(res, false, 400, error.message.replace(/[\"]/gi, ''), null)
    }
}

const createVoteValidator = (req, res, next) => {
    try {
        const value =  vschema.validate(req.body).value;
          req.body = value;
          next();
    } catch (error) {
        console.log(error.message);
      controllerResponseHandler(res, false, 400, error.message.replace(/[\"]/gi, ''), null)
    }
}

const createAnswerValidator = (req, res, next) => {
    try {
        const value = aschema.validate(req.body).value;
          req.body = value;
          next();
    } catch (error) {
        console.log(error.message);
      controllerResponseHandler(res, false, 400, error.message.replace(/[\"]/gi, ''), null)
    }
}

const createCommentValidator = (req, res, next) => {
    try {
        const value =  cschema.validate(req.body).value;
          req.body = value;
          next();
    } catch (error) {
        console.log(error.message);
      controllerResponseHandler(res, false, 400, error.message.replace(/[\"]/gi, ''), null)
    }
}

module.exports = {
    createUserValidator,
    createQuestionValidator,
    createVoteValidator,
    createAnswerValidator,
    createCommentValidator,
};