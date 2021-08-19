// import { JwtPayload } from './../interfaces/jwt-payload.interface';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {      
      super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // jwtFromRequest: authService.returnJwtExtractor(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  // JWT validation runs automaitcally once token is generated Successfully
  async validate(body: any) {
    // body:  {
    //   jwtAccessPayload: { name: 'goku', id: 1 },
    //   iat: 1627189182,
    //   exp: 1627189242
    // }
    let user = await this.authService.validateUser(body.jwtAccessPayload);

    if (!user) {
        console.log('Unauthorized from jwt-auth-guard');
        throw new UnauthorizedException();
    }
    return user;
  }
}
/*
Recall again that Passport will build a user object based on the 
return value of our validate() method, and attach it as a property 
on the Request object.
*/