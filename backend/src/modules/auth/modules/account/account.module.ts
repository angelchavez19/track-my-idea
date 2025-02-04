import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { AuthCommonService } from '../../auth.common.service';

@Module({
  controllers: [AccountController],
  providers: [AuthCommonService, AccountService],
})
export class AccountModule {}
