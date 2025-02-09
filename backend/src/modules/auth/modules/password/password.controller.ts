import { $Enums } from '@prisma/client';
import { Body, Controller, HttpCode, Post, Query } from '@nestjs/common';
import { LangValidationPipe } from 'src/pipes/lang/lang.pipe';
import { ConfirmChangePasswordDTO } from './confirm-change-password.dto';
import { PasswordService } from './password.service';
import { EmailDTO } from '../../dto/email.dto';

@Controller('auth/password')
export class PasswordController {
  constructor(private readonly passwordService: PasswordService) {}

  @Post('request-change')
  @HttpCode(200)
  requestChange(
    @Body() data: EmailDTO,
    @Query('lang', LangValidationPipe) lang: $Enums.Lang,
  ) {
    return this.passwordService.requestChange(data, lang);
  }

  @Post('confirm-change')
  @HttpCode(200)
  confirmChange(
    @Body() data: ConfirmChangePasswordDTO,
    @Query('token') token: string,
  ) {
    return this.passwordService.confirmChange(data, token);
  }
}
