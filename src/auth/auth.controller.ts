import { Controller, Post, Req, UseGuards } from "@nestjs/common";
import type { User as UserType } from "@prisma/client";
import { Request } from "express";
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
  async login(@Req() req: Request, @User() user: UserType) {
    console.log(req)
    return this.authService.login(user);
  }

  @Post('register')
  async register(@Req() req: Request) {
    return this.authService.register(req.body);
  }
}
