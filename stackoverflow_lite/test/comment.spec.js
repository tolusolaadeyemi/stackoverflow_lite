const chai = require('chai');
const request = require('supertest');
const app = require('../app');
const { answers } = require('./seed/seed');

const expect = chai.expect;

describe('comments tests', () => {
  describe('successes', () =>{
    it('should post a valid comment from an authenticated user succesfully', (done) => {
      request(app).post('/api/v1/posts/answers/comments/1')
        .set( "Authorization", `Bearer ${process.env.DEMO_TOKEN}`)
        .send(answers.newAnswer)
        .end((err, res) => {
          if (err) done(err);

          expect(res.body).to.be.an('object').that.has.keys(['success', 'code', 'message','data']);
          expect(res.body.success).to.be.equal(true);
          expect(res.body.code).to.be.equal(201);
          expect(res.body.message).to.be.equal('comment added');
          expect(res.body.data).to.be.equal(`${answers.newAnswer.body}`);
          done();
        });
  })
})

  describe('errors', () => {
    it('should return errors if comment body is too short', (done) => {
      request(app).post('/api/v1/posts/answers/comments/1')
        .set( "Authorization", `Bearer ${process.env.DEMO_TOKEN}`)
        .send(answers.tooShortAnswer)
        .end((err, res) => {
          if (err) done(err);

          expect(res.body).to.be.an('object').that.has.keys(['success', 'code', 'message','data']);
          expect(res.body.success).to.be.equal(false);
          expect(res.body.code).to.be.equal(400);
          expect(res.body.message).to.be.equal('body length must be at least 20 characters long');
          expect(res.body.data).to.be.equal(null);
          done();
        });
  })


it('should return errors if comment body is missing', (done) => {
  request(app).post('/api/v1/posts/answers/comments/1')
    .set( "Authorization", `Bearer ${process.env.DEMO_TOKEN}`)
    .send(answers.emptyAnswer)
    .end((err, res) => {
      if (err) done(err);

      expect(res.body).to.be.an('object').that.has.keys(['success', 'code', 'message','data']);
      expect(res.body.success).to.be.equal(false);
      expect(res.body.code).to.be.equal(400);
      expect(res.body.message).to.be.equal('body is not allowed to be empty');
      expect(res.body.data).to.be.equal(null);
      done();
    });
})


it('should return errors if user is not logged in', (done) => {
  request(app).post('/api/v1/posts/answers/comments/1')
    .send(answers.newAnswer)
    .end((err, res) => {
      if (err) done(err);

      expect(res.body).to.be.an('object').that.has.keys(['success', 'code', 'message','data']);
      expect(res.body.success).to.be.equal(false);
      expect(res.body.code).to.be.equal(401);
      expect(res.body.message).to.be.equal('user must be logged in');
      expect(res.body.data).to.be.equal(null);
      done();
    });
})

})
});