import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { SessionService } from './session.service';
import { LoginDTO } from './dto/login.dto';
import { Request, Response } from 'express';
import { LangValidationPipe } from 'src/pipes/lang/lang.pipe';
import { $Enums } from '@prisma/client';

@Controller('auth')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Get('logout')
  logout(@Res() res: Response) {
    return this.sessionService.logout(res);
  }

  @Get('refresh-token')
  refreshToken(
    @Req() req: Request,
    @Res() res: Response,
    @Query('lang', LangValidationPipe) lang: $Enums.Lang,
  ) {
    return this.sessionService.refreshToken(req, res, lang);
  }

  @Post('login')
  @HttpCode(200)
  login(
    @Res() res: Response,
    @Body() data: LoginDTO,
    @Query('lang', LangValidationPipe) lang: $Enums.Lang,
  ) {
    return this.sessionService.login(res, data, lang);
  }
}
