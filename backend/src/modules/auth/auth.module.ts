import { Module } from '@nestjs/common';
import { AccountModule } from './modules/account/account.module';
import { SessionModule } from './modules/session/session.module';
import { PasswordModule } from './modules/password/password.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [AccountModule, SessionModule, PasswordModule, UserModule],
})
export class AuthModule {}
