import { Module } from '@nestjs/common';
import { AccountModule } from './modules/account/account.module';
import { SessionModule } from './modules/session/session.module';
import { PasswordModule } from './modules/password/password.module';
import { UserModule } from './modules/user/user.module';
import { SocialModule } from './modules/social/social.module';

@Module({
  imports: [AccountModule, SessionModule, PasswordModule, UserModule, SocialModule],
})
export class AuthModule {}
