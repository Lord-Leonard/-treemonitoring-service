import { Controller, Get, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "src/auth/auth.service";
import { PingService } from "src/ping/ping.service";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";

@Controller()
export class AppController {
  constructor(
    private readonly pingservice: PingService, private authService: AuthService
  ) { }


}
