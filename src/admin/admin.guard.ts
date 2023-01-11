import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "@prisma/client";
import { Observable } from "rxjs";
import { jwtConstants } from "../auth/constants";

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private jwtService: JwtService) { }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const authHeader = context.switchToHttp().getRequest().rawHeaders;
    let token
    for (const element of authHeader) {
      if (element.startsWith("Bearer ")) {
        token = element.substring(7, element.length);
        break
      }
    }
    try {
      this.jwtService.verify(token, { secret: jwtConstants.secret })
    } catch (e) {
      // TODO: Logger
      if (e.name === "JsonWebTokenError") {
        throw new UnauthorizedException();
      }
      throw e
    }

    const payload: User = this.jwtService.decode(token) as User;
    if (payload.admin) {
      console.log('Admin section');
      return true;
    } else {
      console.log('Admin access denied');
      return false;
    }
  }
}
