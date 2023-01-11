import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AdminController } from './admin/admin.controller';
import { AuthModule } from "./auth/auth.module";
import { AuthService } from "./auth/auth.service";
import { AppController } from "./controller/app.controller";
import { PingModule } from "./ping/ping.module";
import { PingService } from "./ping/ping.service";
import { PrismaService } from "./prisma/prisma.service";
import { UserModule } from "./user/user.module";
import { UserService } from "./user/user.service";
import { PasswordService } from './password/password.service';

@Module({
  imports: [
    AuthModule,
    UserModule,
    PingModule
  ],
  controllers: [
    AppController,
    AdminController
  ],
  providers: [
    UserService,
    PrismaService,
    PingService,
    AuthService,
    JwtService,
    PasswordService
  ],
})
export class AppModule { }
