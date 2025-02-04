import { Body, Controller, Post, Query } from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountDTO } from './dto/create-account.dto';
import { $Enums } from '@prisma/client';
import { LangValidationPipe } from 'src/pipes/lang/lang.pipe';

@Controller('auth/account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  createAccount(
    @Body() data: CreateAccountDTO,
    @Query('lang', LangValidationPipe) lang: $Enums.Lang,
  ) {
    return this.accountService.createAccount(data, lang);
  }
}
