import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

type JwtPayLoad = {
  sub: string;
  email?: string;
  name?: string;
  picture?: null;
  iat?: number;
};

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, "jwt-access-token") {
  constructor() {
    const secret = process.env.AUTH_SECRET;
    if (!secret) {
      throw new Error("AUTH_SECRET is not set");
    }
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
    });
  }

  async validate(payload: JwtPayLoad) {
    return payload;
  }
}
