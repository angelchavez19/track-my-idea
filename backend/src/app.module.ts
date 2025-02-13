import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { GlobalModule } from './global.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guards/auth/auth.guard';
import { TokenManager } from './common/token.common';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '3d' },
    }),
    AuthModule,
    GlobalModule,
  ],
  controllers: [],
  providers: [TokenManager, { provide: APP_GUARD, useClass: AuthGuard }],
})
export class AppModule {}
