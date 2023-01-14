import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { ApiResponse } from "@nestjs/swagger";
import { ActivationService } from "src/activation/activation.service";
import { CreateUserDto } from "src/user/dto/create-user.dto";
import { LoginUserDto } from "src/user/dto/login-user.dto";
import { User } from "src/user/user.decorator";
import { UserService } from "src/user/user.service";

import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import { LocalAuthGuard } from "./guards/local-auth.guards";

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userActivationService: ActivationService,
    private userService: UserService
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

    return await this.userActivationService.createUserActivation(user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('signout')
  async signout(@User() user) {
    //OOS: Find and deaktivate all Trees from User
    //OOS: Find all Sponsorships and set date_to to current Date.
    //OOS: Find and deactivate all NoticeboardArticles from User

    this.userService.deleteUserById(user.id)

    return { message: 'signout successfully' }
  }
}
