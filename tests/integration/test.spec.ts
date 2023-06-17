import chai from 'chai'
import chaiHttp from 'chai-http'

import createServer from '../../src/utils/server'

const should = chai.should()
chai.use(chaiHttp)



describe('GET /api/v1/test', () => {
  it('should check test route', (done) => {
    chai.request(createServer)
    .get('/api/v1/test')
    .end((err, res) => {
      res.status.should.equal(200)
      res.type.should.equal('application/json')
      res.body.status.should.eql('success')
      res.body.should.include.keys(
        'status', 'message'
      )
      done()
    })
  })
})