import { Module } from '@nestjs/common';
import { SocialService } from './social.service';
import { SocialController } from './social.controller';
import { AuthCommonService } from '../../auth.common.service';
import { UserService } from '../user/user.service';

@Module({
  controllers: [SocialController],
  providers: [AuthCommonService, SocialService, UserService],
})
export class SocialModule {}
