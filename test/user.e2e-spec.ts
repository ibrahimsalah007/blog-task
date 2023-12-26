import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CreateUserDto, LoginDto } from 'App/auth/dto';
import { UserRole } from 'App/user/enum';
import { initializeTransactionalContext } from 'typeorm-transactional';

describe('User Controller (e2e)', () => {
  initializeTransactionalContext();

  let app: INestApplication;
  let userAuthToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
    // Close the app after all tests are done
  });

  const createUserDto: CreateUserDto = {
    email: 'testUser@test.com',
    password: '123456',
    firstName: 'test',
    lastName: 'user',
    phoneNumber: '+201019093332',
    deviceId: '',
    role: UserRole.CUSTOMER,
  };

  describe('User Register', () => {
    it('should be able to create a new account', async () => {
      const response = await request(app.getHttpServer()).post('/auth/register').send(createUserDto);

      expect(response.status).toBe(201);
      expect(response.body.accessToken).toBeDefined();
      expect(response.body.data.type).toBeDefined();
      expect(response.body.data.role).toEqual(UserRole.CUSTOMER);

      userAuthToken = response.body.accessToken;
    });

    it('should fail with conflict due to unique constraints', async () => {
      const response = await request(app.getHttpServer()).post('/auth/register').send(createUserDto);

      expect(response.status).toBe(HttpStatus.CONFLICT);
    });
  });

  describe('User Login', () => {
    const loginDto: LoginDto = {
      identifier: createUserDto.email,
      password: createUserDto.password,
    };

    const invalidCredential: LoginDto = {
      identifier: 'invalidEmail@test.com',
      password: '123467876543',
    };

    it('should be able to login', async () => {
      await request(app.getHttpServer()).post('/auth/login').send(loginDto).expect(HttpStatus.CREATED);
    });

    it('should not able to login due to invalid credentials', async () => {
      await request(app.getHttpServer()).post('/auth/login').send(invalidCredential).expect(HttpStatus.UNAUTHORIZED);
    });
  });
});
