import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { GlobalModule } from './global.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

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
  providers: [],
})
export class AppModule {}
