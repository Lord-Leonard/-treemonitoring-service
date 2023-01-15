import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserService } from "src/user/user.service";
import { jwtConstants } from "../auth.constants";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private userService: UserService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      // OOS: PEM-encoded public Key 
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any) {
    //place for fetching additional User data
    const userIsAdmin = await this.userService.userIsAdmin(payload.sub)

    return {
      userId: payload.sub,
      username: payload.username,
      admin: userIsAdmin
    };
  }
}
