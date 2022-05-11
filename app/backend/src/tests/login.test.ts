import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando rota /login', () => {
  let chaiHttpResponse: Response;
  const requestOk = {
    email: 'paode@batata.com',
    password: 'paodebatata'
  }

  const badRequest = {
    email: 'emailInvalido',
    password: '1234'
  }
  const badRequest2 = {
    email: '',
    password: 'test123456'
  }
  const badRequest3 = {
    email: 'test@test.com',
    password: ''
  }

  it('/login retorna um status 200', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send(requestOk);
    expect(chaiHttpResponse).to.have.status(200);
  });

  it('O campo email deve ser válido', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send(badRequest2);
    expect(chaiHttpResponse.body.error).to.be.equal('All fields must be filled');
    expect(chaiHttpResponse).to.have.status(400);
  });
  it('Os campos email e password devem ser válidos', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send(badRequest);
    expect(chaiHttpResponse.body.error).to.be.equal('Incorrect email or password');
    expect(chaiHttpResponse).to.have.status(400);
  });
  
  it('O campo password deve ser válido', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send(badRequest3);
    expect(chaiHttpResponse.body.error).to.be.equal('All fields must be filled');
    expect(chaiHttpResponse).to.have.status(400);
  });
});

describe('Testando rota /login/validate', () => {
  const jwtToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJwYXNzd29yZCI6InRlc3QxMjM0NTYiLCJyb2xlIjoiYWRtaW4ifQ.PQ0He6tTTT6vodYLdZyRSVjWweFoiBCVxIHDLrighvs'
  const invalidToken = 'tokenInvalid';
  it('/login/validate retorna um status 200 ao passar um token válido', async () => {
    const chaiHttpResponse = await chai.request(app).get('/login/validate').set('Authorization', 'jwtToken');
    expect(chaiHttpResponse).to.have.status(200);
  });

  it('/login/validate retorna uma role ao passar o token correto', async () => {
    const chaiHttpResponse = await chai.request(app).get('/login/validate').set('Authorization', jwtToken);
    expect(chaiHttpResponse.body.role).to.be.equal('admin');
  });

  it('/login/validate retorna um status 400 quando for passado um token inválido', async () => {
    const chaiHttpResponse = await chai.request(app).get('/login/validate').set('Authorization', 'invalidToken');
    expect(chaiHttpResponse).to.have.status(400);
  });
}); 