import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { ActivationService } from "src/activation/activation.service";
import { LinkService } from "src/link/link.service";
import { PasswordService } from "src/password/password.service";
import { PrismaService } from "src/prisma/prisma.service";
import { UserModule } from "src/user/user.module";
import { UserService } from "../user/user.service";
import { jwtConstants } from "./auth.constants";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { LocalStrategy } from "./strategies/local.strategy";

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
    ConfigModule,
  ],
  providers: [
    AuthService,
    LocalStrategy,
    UserService,
    JwtStrategy,
    PrismaService,
    PasswordService,
    LinkService,
    ActivationService
  ],
  controllers: [AuthController]
})
export class AuthModule { }
