const chai = require('chai');
const request = require('supertest');
const app = require('../app');

const expect = chai.expect;


describe('votes tests', () => {
  describe('successes', () =>{
    it('should let an authenticated user upvote succesfully', (done) => {
      request(app).post('/api/v1/posts/answers/votes/14')
        .set( "Authorization", `Bearer ${process.env.DEMO_TOKEN}`)
        .send({ vote_type: "up" })
        .end((err, res) => {
          if (err) done(err);

          expect(res.body).to.be.an('object').that.has.keys(['success', 'code', 'message','data']);
          expect(res.body.success).to.be.equal(true);
          expect(res.body.code).to.be.equal(201);
          expect(res.body.message).to.be.equal('your vote was recorded');
          expect(res.body.data).to.be.equal('you gave this answer a/an up vote');
          done();
        });
  })

  it('should let an authenticated user upvote succesfully', (done) => {
    request(app).post('/api/v1/posts/answers/votes/13')
      .set( "Authorization", `Bearer ${process.env.DEMO_TOKEN}`)
      .send({ vote_type: "down" })
      .end((err, res) => {
        if (err) done(err);

        expect(res.body).to.be.an('object').that.has.keys(['success', 'code', 'message','data']);
        expect(res.body.success).to.be.equal(true);
        expect(res.body.code).to.be.equal(201);
        expect(res.body.message).to.be.equal('your vote was recorded');
        expect(res.body.data).to.be.equal('you gave this answer a/an down vote');
        done();
      });
})


it('should return errors if vote_type is missing', (done) => {
  request(app).post('/api/v1/posts/answers/votes/13')
    .set( "Authorization", `Bearer ${process.env.DEMO_TOKEN}`)
    .send({ vote_type:""})
    .end((err, res) => {
      if (err) done(err);

      expect(res.body).to.be.an('object').that.has.keys(['success', 'code', 'message','data']);
      expect(res.body.success).to.be.equal(false);
      expect(res.body.code).to.be.equal(400);
      expect(res.body.message).to.be.equal('vote_type must be one of [up, down]');
      expect(res.body.data).to.be.equal(null);
      done();
    });
})

})
});

  
