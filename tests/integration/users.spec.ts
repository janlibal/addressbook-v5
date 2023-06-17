import { randEmail, randFullName } from '@ngneat/falso'
import chai from 'chai'
import chaiHttp from 'chai-http'
import { knex } from '../../src/database'
import userRepository from '../../src/repositories/userRepository'
import crypto from '../../src/utils/crypto'
import createServer from '../../src/utils/server'
import { createDummy, createDummyAndAuthorize } from '../helpers'

const should = chai.should()
chai.use(chaiHttp)


let dummy: any


describe('POST /api/v1/login', () => {
  beforeEach(async() => {
    return await knex.migrate.rollback()
    .then(async () => {return await knex.migrate.latest()})
    .then(async () => { dummy = await createDummy() })
  })

  afterEach(async () => {
    return await knex.migrate.rollback()
  })
  
    it('1. should login user', (done) => {
      chai.request(createServer)
      .post('/api/v1/login')
      .send({
        email: dummy.email, //'joe.doe@joedoe.com',
        password: 'Password123!'
      })
      .end((err, res) => {
        res.status.should.equal(200)
        res.type.should.equal('application/json')
        res.body.status.should.eql('success')
        res.body.should.include.keys(
            'status', 'data'
        )
        res.body.data.should.include.keys(
          'email', 'token', 'id'
        )
        done()
      })
    })

    it('2. should throw an error if password is missing', (done) => {
        chai.request(createServer)
        .post('/api/v1/login')
        .send({
          email: dummy.email,
        })
        .end((err, res) => {
          res.status.should.equal(400)
          res.type.should.equal('application/json')
          res.body.should.be.a('object')
          res.body.should.have.property('error')
          res.body.error.should.have.property('status')
          res.body.error.should.have.property('name').eql('RequestValidationErrors')
          done()
        })
    })

    it('3. should throw an error if email is missing', (done) => {
      chai.request(createServer)
      .post('/api/v1/login')
      .send({
        password: 'Password123!'
      })
      .end((err, res) => {
          res.status.should.equal(400)
        res.type.should.equal('application/json')
        res.body.should.be.a('object')
        res.body.should.have.property('error')
        res.body.error.should.have.property('status')
        res.body.error.should.have.property('name').eql('RequestValidationErrors')
        done()
      })
  })

  it('4. should throw an error if email is malformed', (done) => {
    chai.request(createServer)
    .post('/api/v1/login')
    .send({
      email: 'joedoe.com',
      password: 'Password123!'
    })
    .end((err, res) => {
      res.status.should.equal(400)
      res.type.should.equal('application/json')
      res.body.should.be.a('object')
        res.body.should.have.property('error')
        res.body.error.should.have.property('status')
        res.body.error.should.have.property('name').eql('RequestValidationErrors')
      done()
    })
  })
})



describe('POST /api/v1/user', () => {
  beforeEach(async() => {
    return await knex.migrate.rollback()
    .then(async () => {return await knex.migrate.latest()})
    .then(async () => { dummy = await createDummy() })
  })

  afterEach(async () => {
    return await knex.migrate.rollback()
  })
  it('5. should create user', (done) => {
    chai.request(createServer)
    .post('/api/v1/user')
    .send({
      name: 'Dan Doe',
      email: randEmail(),
      password: 'Password123!'
    })
    .end((err, res) => {
      res.status.should.equal(200)
      res.type.should.equal('application/json')
      res.body.status.should.eql('success')
      res.body.should.include.keys(
          'status', 'data'
      )
      res.body.data.should.include.keys(
        'email', 'token', 'id'
      )
      done()
    })
  })

  it('6. should throw an error if password is missing', (done) => {
      chai.request(createServer)
      .post('/api/v1/user')
      .send({
        name: 'Jane Doe',
        email: randEmail(),
      })
      .end((err, res) => {
        res.status.should.equal(400)
        res.type.should.equal('application/json')
        res.body.should.be.a('object')
        res.body.should.have.property('error')
        res.body.error.should.have.property('status')
        res.body.error.should.have.property('name').eql('RequestValidationErrors')
        done()
      })
  })

  it('7. should throw an error if email is missing', (done) => {
    chai.request(createServer)
    .post('/api/v1/login')
    .send({
      name: 'Jane Doe',
      password: 'Password123!'
    })
    .end((err, res) => {
      res.status.should.equal(400)
      res.type.should.equal('application/json')
      res.body.should.be.a('object')
      res.body.should.have.property('error')
      res.body.error.should.have.property('status')
      res.body.error.should.have.property('name').eql('RequestValidationErrors')
      done()
    })
  })

  it('8. should throw an error if name is missing', (done) => {
    chai.request(createServer)
    .post('/api/v1/user')
    .send({
      email: randEmail(),
      password: 'Password123!'
    })
    .end((err, res) => {
      res.status.should.equal(400)
      res.type.should.equal('application/json')
      res.body.should.be.a('object')
      res.body.should.have.property('error')
      res.body.error.should.have.property('status')
      res.body.error.should.have.property('name').eql('RequestValidationErrors')
      done()
    })
  })

  it('9. should throw an error if email is malformed', (done) => {
    chai.request(createServer)
    .post('/api/v1/user')
    .send({
      name: 'Jane Doe',
      email: 'jane.doe@janedoe',
      password: 'Password123!'
    })
    .end((err, res) => {
      res.status.should.equal(400)
      res.type.should.equal('application/json')
      res.body.should.be.a('object')
      res.body.should.have.property('error')
      res.body.error.should.have.property('status')
      res.body.error.should.have.property('name').eql('RequestValidationErrors')
      done()
    })
  })

  it('10. should throw an error if name is malformed', (done) => {
    chai.request(createServer)
    .post('/api/v1/user')
    .send({
      name: 1324,
      email: randEmail(),
      password: 'Password123!'
    })
    .end((err, res) => {
      res.status.should.equal(400)
      res.type.should.equal('application/json')
      res.body.should.be.a('object')
      res.body.should.have.property('error')
      res.body.error.should.have.property('status')
      res.body.error.should.have.property('name').eql('RequestValidationErrors')

      done()
    })
  })
})