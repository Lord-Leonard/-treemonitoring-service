import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { compare, hashSync } from 'bcrypt';
import { PasswordService } from 'src/password/password.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginUserDto } from 'src/user/dto/login-user.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private passwordService: PasswordService
  ) { }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.user({ username });
    if (user && await compare(pass, user.password_hash)) {
      const { password_hash, ...result } = user;
      return result;
    }
    return null;
  };

  async login(user: LoginUserDto) {
    const payload = { username: user.username, sub: user.id, admin: user.admin };
    return {
      access_token: this.jwtService.sign(payload)
    };
  };

  async register(user: CreateUserDto): Promise<User> {
    await this.passwordService.validatePassword(user.password);

    if (await this.userService.usernameExists(user.username)) {
      throw new HttpException('Username allready in use', HttpStatus.CONFLICT);
    }

    if (await this.userService.emailExists(user.email)) {
      throw new HttpException('Email allready in use', HttpStatus.CONFLICT);
    }

    return await this.userService.createUser({
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      password_hash: hashSync(user.password, 10)
    });
  };
}
