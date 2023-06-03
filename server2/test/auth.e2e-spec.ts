import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Authentication System (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    // setupApp(app)
    await app.init();
  });

  it('handles a signup request', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/ (GET)', () => {
    const newUser = {
      "email":"rom4.chenard@gmail.com",
      "password": "azerty"
    }
    return request(app.getHttpServer())
      .post('/auth/signup')
      .send(newUser)
      .expect(201)
      .then((res)=>{
        const {id, email} = res.body
        expect(id).toBeDefined;
        expect(email).toEqual(newUser.email)
      })
  });

  it('signup as a new user then get the currently logged in user', async ()=>{
    const email = "asdf@azdf.com"
    const res = await request(app.getHttpServer())
        .post('/auth/signup')
        .send({email, password: 'asdf'})
        .expect(201)
    const cookie = res.get('Set-Cookie')
    console.log('==> COOKIE : ', cookie)

    const {body} = await request(app.getHttpServer())
      .get('/auth/whoami')
      .set('Cookie', cookie)
      .expect(200)

    expect(body.email).toEqual(email)
  })
});