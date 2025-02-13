import { Controller, Get, Query, Res } from '@nestjs/common';
import { SocialService } from './social.service';
import { Response } from 'express';
import { $Enums } from '@prisma/client';
import { LangValidationPipe } from 'src/pipes/lang/lang.pipe';

@Controller('auth/social')
export class SocialController {
  constructor(private readonly socialService: SocialService) {}

  @Get('github')
  githubLogin(
    @Res() response: Response,
    @Query('code') code: string,
    @Query('lang', LangValidationPipe) lang: $Enums.Lang,
  ) {
    return this.socialService.githubLogin(response, code, lang);
  }

  @Get('google')
  googleLogin(
    @Res() response: Response,
    @Query('code') code: string,
    @Query('lang', LangValidationPipe) lang: $Enums.Lang,
  ) {
    return this.socialService.googleLogin(response, code, lang);
  }
}
