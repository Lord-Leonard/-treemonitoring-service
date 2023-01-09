import { Controller, Get, Post, UseGuards, Request } from "@nestjs/common";
import { PingService } from "src/ping/ping.service";
import { AuthGuard} from '@nestjs/passport'
import { LocalAuthGuard } from "src/auth/local-auth.guards";
import { AuthService } from "src/auth/auth.service";

@Controller()
export class AppController {
  constructor(
    private readonly pingservice: PingService, private authService: AuthService
  ) {}

  @Get('ping')
  ping(): string {
    return this.pingservice.ping();
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req){
    return this.authService.login(req.user);
  }
}
