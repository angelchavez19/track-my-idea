import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UserPayloadI } from 'src/types/user.type';

@Injectable()
export class TokenManager {
  constructor(private readonly jwt: JwtService) {}

  getAccessTokenFromRequest(req: Request) {
    const accessToken = req.cookies.access_token;

    if (!accessToken) return;

    return this.verifyToken<UserPayloadI>(accessToken);
  }

  verifyToken<T extends object = any>(token: string) {
    try {
      return this.jwt.verify<T>(token);
    } catch {
      return;
    }
  }
}
