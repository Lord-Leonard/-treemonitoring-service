import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { ApiResponse } from "@nestjs/swagger";
import { UserActivationService } from "src/user-activation/user-activation.service";
import { CreateUserDto } from "src/user/dto/create-user.dto";
import { LoginUserDto } from "src/user/dto/login-user.dto";
import { User } from "src/user/user.decorator";

import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./guards/local-auth.guards";

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userActivationService: UserActivationService
  ) { }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@User() userData: LoginUserDto) {
    return this.authService.login(userData);
  }

  @ApiResponse({ status: 201, description: 'The record has been successfully created.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Post('register')
  async register(@Body() userData: CreateUserDto) {
    const user = await this.authService.register(userData);

    return await this.userActivationService.createUserActivation(user);
  }
}
