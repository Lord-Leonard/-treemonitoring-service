import { Controller, Get, Request, UseGuards } from "@nestjs/common";
import { PingService } from "src/ping/ping.service";
import { AuthService } from "src/auth/auth.service";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";

@Controller()
export class AppController {
  constructor(
    private readonly pingservice: PingService, private authService: AuthService
  ) {}

  @Get('ping')
  ping(): string {
    return this.pingservice.ping();
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
