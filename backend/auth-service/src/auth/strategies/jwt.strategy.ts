import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Admin } from '../auth.model';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'your-secret-key',
    });
  }

  async validate(payload: any): Promise<Partial<Admin>> {  // Use Partial<Admin> here
    return { 
      _id: payload.sub, 
      username: payload.username,
      // Add other required fields if needed
    };
  }
}