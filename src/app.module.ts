import { Module } from "@nestjs/common";
import { AppController } from "./controller/app.controller";
import { AppService } from "./service/app.service";
import { Service } from "./user/service";
import { PrismaService } from "./service/prisma.service";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { PingModule } from "./ping/ping.module";
import { PingService } from "./ping/ping.service";
import { AuthService } from "./auth/auth.service";
import { JwtService } from "@nestjs/jwt";

@Module({
  imports: [
    AuthModule,
    UsersModule,
    PingModule
  ],
  controllers: [
    AppController
  ],
  providers: [
    AppService,
    Service,
    PrismaService,
    PingService,
    AuthService,
    JwtService
  ],
})
export class AppModule {}
