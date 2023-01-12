import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Prisma, User } from '@prisma/client';
import { compare } from 'bcrypt';
import { PasswordService } from 'src/password/password.service';
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
  }

  async login(user: User) {
    const payload = { username: user.username, sub: user.id, admin: user.admin };
    return {
      access_token: this.jwtService.sign(payload)
    };
  }

  register(user: Prisma.UserCreateInput) {
    try {
      this.passwordService.checkPasswordToPolicy(user.password_hash)
    }

    user = this.userService.createUser(user)
  }
}
