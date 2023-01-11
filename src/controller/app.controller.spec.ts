import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/user/user.service';
import { AppService } from '../service/app.service';
import { AppController } from './app.controller';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService, AuthService, UserService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.ping()).toBe('pong!');
    });
  });

  describe('login', () => {
    it('should return an user', async () => {
      const loginData = {
        "username": "john",
        "password": "changeme"
      }
      const userData = {
        "id": 1,
        "username": "john"
      }
      expect(appController.login(loginData)).toBe(userData)
    })
  })
});
