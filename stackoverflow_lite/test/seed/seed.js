
const users = {
  newUser: {
    username: 'janelleska' + Date.now(),
    password: 'mypassword',
  },
  validUser: {
    username: 'luciusmalfoy',
    password: 'omegle',
  },
  validUserInvalidPass: {
    username: 'janeiscool',
    password: 'thisiswrong',
  },
  invalidUser: {
    username: 'salewabad',
    password: 'invalid',
  },
  invalidUserNoName: {
    username: '',
    password: 'insecure',
  },
  invalidUserNoPass: {
    username: 'wizardofoz',
    password: '',
  },
};

const questions = {
  newQuestion: {
    title: 'NodeJs Environment variables vs config file',
    body: 'Actually I have a nodejs express app with its config file for params like host, port, JWT token, DB params and more.'
  },
  invalidQuestionNoTitle : {
    title: '',
    body: 'I\'m creating a RESTful API with NodeJS, express, express-resource, and Sequelize that is used to manage datasets stored in a MySQL database. I\'m trying to figure out how to properly update a record using Sequelize.'
  },
  invalidQuestionShortTitle: {
    title: 'How to use',
    body: 'I\'m creating a RESTful API with NodeJS, express, express-resource, and Sequelize that is used to manage datasets stored in a MySQL database. I\'m trying to figure out how to properly update a record using Sequelize.'
  },
  invalidQuestionShortBody : {
    title: 'How to update a record using sequelize for node?',
    body: 'I\'m creating a '
  },
  invalidQuestionNoBody : {
    title: 'How to update a record using sequelize for node?',
    body: ''
  }
}

const answers = {
  newAnswer: {
    body: 'To access environment variables you can use process.env.VARIABLE in your nodejs code (is always a string), as long as the variable is set before the process is started.'
  },
  tooShortAnswer: {
    body: 'For typescript'
  },
  emptyAnswer: {
    body: ''
  }
}

module.exports = {
  users,
  questions,
  answers,
};