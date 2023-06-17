import chai from 'chai'
import chaiHttp from 'chai-http'
import { knex } from '../../src/database'
import createServer from '../../src/utils/server'
import { createDummyAndAuthorize } from '../helpers'
import { randLastName, randFirstName, randPhoneNumber, randStreetAddress } from '@ngneat/falso'


const should = chai.should()
chai.use(chaiHttp)


let usr: any


describe('POST /api/v1/address', () => {
  beforeEach(async() => {
    return await knex.migrate.rollback()
    .then(async () => {return await knex.migrate.latest()})
    .then(async () => { usr = await createDummyAndAuthorize() })
    
  })
  
  afterEach(async () => {
    return await knex.migrate.rollback()
  })
  
  it('11. should submit new address', (done) => {

    const contact = {
      firstName: randFirstName(),
      lastName: randLastName(),
      phoneNo: randPhoneNumber(),
      address: randStreetAddress(),
    }

    chai.request(createServer)
    .post('/api/v1/address')
    .set('Authorization', `jwt ${usr.accessToken}`)
    .send(contact)
    .end((err, res) => {
      res.status.should.equal(200)
      res.type.should.equal('application/json')
      res.body.status.should.eql('success')
      done()
    })
  })

  it('12. should throw an error if first name is missing', (done) => {

    const contact = {
      //firstName: randFirstName(),
      lastName: randLastName(),
      phoneNo: randPhoneNumber(),
      address: randStreetAddress(),
    }

    chai.request(createServer)
    .post('/api/v1/address')
    .set('Authorization', `jwt ${usr.accessToken}`)
    .send(contact)
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

  it('13. should throw an error if last name is missing', (done) => {

    const contact = {
      firstName: randFirstName(),
      //lastName: randLastName(),
      phoneNo: randPhoneNumber(),
      address: randStreetAddress(),
    }

    chai.request(createServer)
    .post('/api/v1/address')
    .set('Authorization', `jwt ${usr.accessToken}`)
    .send(contact)
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

  it('14. should throw an error if phone number is missing', (done) => {

    const contact = {
      firstName: randFirstName(),
      lastName: randLastName(),
      //phoneNo: randPhoneNumber(),
      address: randStreetAddress(),
    }

    chai.request(createServer)
    .post('/api/v1/address')
    .set('Authorization', `jwt ${usr.accessToken}`)
    .send(contact)
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

  it('15. should throw an error if address is missing', (done) => {

    const contact = {
      firstName: randFirstName(),
      lastName: randLastName(),
      phoneNo: randPhoneNumber(),
      //address: randStreetAddress(),
    }

    chai.request(createServer)
    .post('/api/v1/address')
    .set('Authorization', `jwt ${usr.accessToken}`)
    .send(contact)
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

  it('16. should throw an error if address is malformed', (done) => {

    const contact = {
      firstName: 12345, //randFirstName(),
      lastName: randLastName(),
      phoneNo: randPhoneNumber(),
      address: randStreetAddress(),
    }

    chai.request(createServer)
    .post('/api/v1/address')
    .set('Authorization', `jwt ${usr.accessToken}`)
    .send(contact)
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

  it('17. should throw an error if first name is malformed', (done) => {

    const contact = {
      firstName: randFirstName(),
      lastName: 123456, //randLastName(),
      phoneNo: randPhoneNumber(),
      address: randStreetAddress(),
    }

    chai.request(createServer)
    .post('/api/v1/address')
    .set('Authorization', `jwt ${usr.accessToken}`)
    .send(contact)
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

  it('18. should throw an error if phone number is malformed', (done) => {

    const contact = {
      firstName: randFirstName(),
      lastName: randLastName(),
      phoneNo: 123456, //randPhoneNumber(),
      address: randStreetAddress(),
    }

    chai.request(createServer)
    .post('/api/v1/address')
    .set('Authorization', `jwt ${usr.accessToken}`)
    .send(contact)
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

  it('19. should throw an error if address is malformed', (done) => {

    const contact = {
      firstName: randFirstName(),
      lastName: randLastName(),
      phoneNo: randPhoneNumber(),
      address: 123465 //randStreetAddress(),
    }

    chai.request(createServer)
    .post('/api/v1/address')
    .set('Authorization', `jwt ${usr.accessToken}`)
    .send(contact)
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


  it('19. should throw an error if there is invalid token', (done) => {

    const contact = {
      firstName: randFirstName(),
      lastName: randLastName(),
      phoneNo: randPhoneNumber(),
      address: randStreetAddress(),
    }

    chai.request(createServer)
    .post('/api/v1/address')
    //.set('Authorization', `jwt ${usr.accessToken}`)
    .send(contact)
    .end((err, res) => {
      res.status.should.equal(403)
      res.type.should.equal('application/json')
      res.body.should.be.a('object')
      res.body.should.have.property('error')
      res.body.error.should.have.property('status')
      res.body.error.should.have.property('name').eql('InvalidToken')

      done()
    })
  })

})