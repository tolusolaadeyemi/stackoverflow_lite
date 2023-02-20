const chai = require('chai');
const request = require('supertest');
const app = require('../app');
const { questions } = require('./seed/seed');

const expect = chai.expect;

describe('question tests', () => {
  describe('successes', () =>{
    it('should post a valid question from an authenticated user succesfully', (done) => {
      request(app).post('/api/v1/posts')
        .set( "Authorization", `Bearer ${process.env.DEMO_TOKEN}`)
        .send(questions.newQuestion)
        .end((err, res) => {
          if (err) done(err);

          expect(res.body).to.be.an('object').that.has.keys(['success', 'code', 'message','data']);
          expect(res.body.success).to.be.equal(true);
          expect(res.body.code).to.be.equal(201);
          expect(res.body.message).to.be.equal('post created');
          expect(res.body.data).to.be.equal(`${questions.newQuestion.title}`);
          done();
        });
  })

  it('should fetch a single question succesfully', (done) => {
    request(app).get('/api/v1/posts/5')
      .set( "Authorization", `Bearer ${process.env.DEMO_TOKEN}`)
      .end((err, res) => {
        if (err) done(err);

        expect(res.body).to.be.an('object').that.has.keys(['success', 'code', 'message','data']);
        expect(res.body.success).to.be.equal(true);
        expect(res.body.code).to.be.equal(200);
        expect(res.body.message).to.be.equal('success');
        expect(res.body.data).to.be.an('object').that.has.keys(['uuid', 'username','title','body','createdAt','updatedAt', 'answer_count']);
        done();
      });
})

it('should fetch all questions succesfully', (done) => {
  request(app).get('/api/v1/posts')
    .set( "Authorization", `Bearer ${process.env.DEMO_TOKEN}`)
    .end((err, res) => {
      if (err) done(err);

      expect(res.body).to.be.an('object').that.has.keys(['success', 'code', 'message','data']);
      expect(res.body.success).to.be.equal(true);
      expect(res.body.code).to.be.equal(200);
      expect(res.body.message).to.be.equal('success');
      expect(res.body.data).to.be.an('array');
      done();
    });
})

it('should let an authenticated user delete his/her question', (done) => {
  request(app).delete('/api/v1/posts/17')
    .set( "Authorization", `Bearer ${process.env.DEMO_TOKEN}`)
    .end((err, res) => {
      if (err) done(err);

      expect(res.body).to.be.an('object').that.has.keys(['success', 'code', 'message','data']);
      expect(res.body.success).to.be.equal(true);
      expect(res.body.code).to.be.equal(200);
      expect(res.body.message).to.be.equal('post removed');
      expect(res.body.data).to.be.equal(null);
      done();
    });
})

})


  describe('errors', () => {
    it('should return errors if question title is too short/ not descriptive', (done) => {
      request(app).post('/api/v1/posts')
        .set( "Authorization", `Bearer ${process.env.DEMO_TOKEN}`)
        .send(questions.invalidQuestionShortTitle)
        .end((err, res) => {
          if (err) done(err);

          expect(res.body).to.be.an('object').that.has.keys(['success', 'code', 'message','data']);
          expect(res.body.success).to.be.equal(false);
          expect(res.body.code).to.be.equal(400);
          expect(res.body.message).to.be.equal('title length must be at least 15 characters long');
          expect(res.body.data).to.be.equal(null);
          done();
        });
  })

  it('should return errors if question body is too short/ not descriptive', (done) => {
    request(app).post('/api/v1/posts')
      .set( "Authorization", `Bearer ${process.env.DEMO_TOKEN}`)
      .send(questions.invalidQuestionShortBody)
      .end((err, res) => {
        if (err) done(err);

        expect(res.body).to.be.an('object').that.has.keys(['success', 'code', 'message','data']);
        expect(res.body.success).to.be.equal(false);
        expect(res.body.code).to.be.equal(400);
        expect(res.body.message).to.be.equal('body length must be at least 30 characters long');
        expect(res.body.data).to.be.equal(null);
        done();
      });
})

it('should return errors if question body is missing', (done) => {
  request(app).post('/api/v1/posts')
    .set( "Authorization", `Bearer ${process.env.DEMO_TOKEN}`)
    .send(questions.invalidQuestionNoBody)
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

it('should return errors if question title is missing', (done) => {
  request(app).post('/api/v1/posts')
    .set( "Authorization", `Bearer ${process.env.DEMO_TOKEN}`)
    .send(questions.invalidQuestionNoTitle)
    .end((err, res) => {
      if (err) done(err);

      expect(res.body).to.be.an('object').that.has.keys(['success', 'code', 'message','data']);
      expect(res.body.success).to.be.equal(false);
      expect(res.body.code).to.be.equal(400);
      expect(res.body.message).to.be.equal('title is not allowed to be empty');
      expect(res.body.data).to.be.equal(null);
      done();
    });
})

it('should return errors if user is not logged in and tries to ask a question', (done) => {
  request(app).post('/api/v1/posts')
    .send(questions.newQuestion)
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

it('should return errors if an authenticated user tries to delete someone elses question', (done) => {
  request(app).delete('/api/v1/posts/3')
    .set( "Authorization", `Bearer ${process.env.DEMO_TOKEN}`)
    .end((err, res) => {
      if (err) done(err);

      expect(res.body).to.be.an('object').that.has.keys(['success', 'code', 'message','data']);
      expect(res.body.success).to.be.equal(false);
      expect(res.body.code).to.be.equal(401);
      expect(res.body.message).to.be.equal('user not authorized to delete this post');
      expect(res.body.data).to.be.equal(null);
      done();
    });
})

it('should throw an error if question id does not exist', (done) => {
  request(app).get('/api/v1/posts/4')
    .set( "Authorization", `Bearer ${process.env.DEMO_TOKEN}`)
    .end((err, res) => {
      if (err) done(err);

      expect(res.body).to.be.an('object').that.has.keys(['success', 'code', 'message','data']);
      expect(res.body.success).to.be.equal(false);
      expect(res.body.code).to.be.equal(404);
      expect(res.body.message).to.be.equal('there isn\'t any post with this id');
      expect(res.body.data).to.be.equal(null);
      done();
    });
})

})
});

  
