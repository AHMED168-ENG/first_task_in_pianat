import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class jwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET_KEY,
      ignoreExpiration: false, // تجاهل انتهاء الصلاحيه
    });
  }

  async validate(payload: any) {
    return payload;
  }
}
