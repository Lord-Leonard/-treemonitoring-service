import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from '../service/app.service';
import { AuthService } from 'src/auth/auth.service';
import { PingService } from 'src/ping/ping.service';
import { UsersService } from 'src/users/users.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService, AuthService, UsersService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.ping()).toBe('pong!');
    });
  });

  describe('login', () =>{
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
