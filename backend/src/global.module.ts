import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfigCommonService } from './common/config.common';
import { LoggerCommonService } from './common/logger.common';
import { PrismaService } from './providers/prisma/prisma';
import { EmailService } from './providers/email/email';
import { PrismaCommonService } from './common/prisma.common';

@Global()
@Module({
  providers: [
    ConfigCommonService,
    ConfigService,
    EmailService,
    LoggerCommonService,
    PrismaCommonService,
    PrismaService,
  ],
  exports: [
    ConfigCommonService,
    ConfigService,
    EmailService,
    LoggerCommonService,
    PrismaCommonService,
    PrismaService,
  ],
})
export class GlobalModule {}
