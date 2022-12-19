/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as pactum from 'pactum';
import { AppModule } from '../src/app.module';
import { AuthDto } from '../src/auth/dto';
import { PrismaService } from '../src/prisma/prisma.service';

describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );
    await app.init();
    await app.listen(5000);
    pactum.request.setBaseUrl('http://localhost:5000');

    prisma = app.get(PrismaService);
  });
  afterAll(() => {
    app.close();
  });
  it.todo('should compile');
});

//auth
describe('Auth', () => {
  const dto: AuthDto = {
    adminID: '223yui',
    email: 'user@example.com',
    firstName: 'John',
    lastName: 'Doe',
    password: 'life',
  };
  describe('Signup', () => {
    it.todo('should sign up');
  });

  describe('Login', () => {});
});

//admin
describe('Admin', () => {
  describe('Get admin', () => {});

  describe('Edit admin', () => {});

  describe('Delete admin', () => {});
});

//place
describe('Place', () => {
  describe('Create place', () => {});

  describe('Get all place', () => {});

  describe('Get single place', () => {});

  describe('Edit place', () => {});

  describe('Delete place', () => {});
});

//tourist
describe('Tourist', () => {
  describe('Create tourist', () => {});

  describe('Get all tourists', () => {});

  describe('Get single tourist', () => {});

  describe('Edit tourist', () => {});

  describe('Delete tourist', () => {});
});
