import { Module } from '@nestjs/common';
import { AccountModule } from './modules/account/account.module';
import { SessionModule } from './modules/session/session.module';
import { PasswordModule } from './modules/password/password.module';

@Module({
  imports: [AccountModule, SessionModule, PasswordModule],
})
export class AuthModule {}
