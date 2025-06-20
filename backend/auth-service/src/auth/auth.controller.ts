import { Controller, Post, Body, Session, Res, UnauthorizedException } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(
    @Body() body: { username: string; password: string },
    @Session() session: Record<string, any>,
  ) {
    const user = await this.authService.validateUser(body.username, body.password);
    if (user === undefined || user === null) throw new Error('Invalid credentials');
    session.user = user; // Simple session-based auth
    return { success: true };
  }
}