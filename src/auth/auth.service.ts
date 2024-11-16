import { COOKIE_NAME } from '@/auth/jwt.strategy';
import { Injectable } from '@nestjs/common';
import { CookieOptions, Response } from 'express';

@Injectable()
export class AuthService {
  private expiresTimeTokenMilliseconds = 1000 * 60 * 60 * 24 * 7; // 7 days

  setJwtTokenToCookies(res: Response, encodedJWTUser: string) {
    const expirationDateInMilliseconds =
      new Date().getTime() + this.expiresTimeTokenMilliseconds;
    const cookieOptions: CookieOptions = {
      httpOnly: true,
      expires: new Date(expirationDateInMilliseconds),
    };

    res.cookie(COOKIE_NAME, encodedJWTUser, cookieOptions);
  }
}
