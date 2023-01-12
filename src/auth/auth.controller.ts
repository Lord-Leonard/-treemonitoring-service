import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import type { Prisma, User as UserType } from "@prisma/client";
import { User } from "src/user/user.decorator";

import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./guards/local-auth.guards";

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService
  ) { }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@User() user: UserType) {
    return this.authService.login(user);
  }

  @Post('register')
  async register(@Body() user: Prisma.UserCreateInput) {
    return this.authService.register(user);
  }
}
