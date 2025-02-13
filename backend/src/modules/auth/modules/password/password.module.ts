import { Module } from '@nestjs/common';
import { PasswordService } from './password.service';
import { PasswordController } from './password.controller';
import { AuthCommonService } from '../../auth.common.service';

@Module({
  controllers: [PasswordController],
  providers: [AuthCommonService, PasswordService],
})
export class PasswordModule {}
