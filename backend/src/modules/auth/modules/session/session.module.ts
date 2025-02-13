import { Module } from '@nestjs/common';
import { SessionService } from './session.service';
import { SessionController } from './session.controller';
import { AuthCommonService } from '../../auth.common.service';

@Module({
  controllers: [SessionController],
  providers: [AuthCommonService, SessionService],
})
export class SessionModule {}
