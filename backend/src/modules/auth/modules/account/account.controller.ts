import { Body, Controller, Get, HttpCode, Post, Query } from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountDTO } from './dto/create-account.dto';
import { $Enums } from '@prisma/client';
import { LangValidationPipe } from 'src/pipes/lang/lang.pipe';
import { EmailDTO } from '../../dto/email.dto';

@Controller('auth/account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get('confirm')
  confirmAccount(@Query('token') token: string) {
    return this.accountService.confirmAccount(token);
  }

  @Post()
  createAccount(
    @Body() data: CreateAccountDTO,
    @Query('lang', LangValidationPipe) lang: $Enums.Lang,
  ) {
    return this.accountService.createAccount(data, lang);
  }

  @Post('refresh-token')
  @HttpCode(200)
  refreshToken(
    @Body() data: EmailDTO,
    @Query('lang', LangValidationPipe) lang: $Enums.Lang,
  ) {
    return this.accountService.refreshToken(data, lang);
  }
}
