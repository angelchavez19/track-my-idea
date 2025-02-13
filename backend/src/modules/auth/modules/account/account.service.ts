import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/providers/prisma/prisma';
import { CreateAccountDTO } from './dto/create-account.dto';
import { ConfigCommonService } from 'src/common/config.common';
import { PrismaCommonService } from 'src/common/prisma.common';
import { LoggerCommonService } from 'src/common/logger.common';
import { AuthCommonService } from '../../auth.common.service';
import { $Enums } from '@prisma/client';
import { EmailService } from 'src/providers/email/email';
import { getCreateAccountEmail } from '../../template-email/create-account.email';
import { EmailDTO } from '../../dto/email.dto';

@Injectable()
export class AccountService {
  constructor(
    private readonly authCommon: AuthCommonService,
    private readonly config: ConfigCommonService,
    private readonly email: EmailService,
    private readonly logger: LoggerCommonService,
    private readonly prismaCommon: PrismaCommonService,
    private readonly prisma: PrismaService,
  ) {}

  async confirmAccount(token: string) {
    if (!token) {
      this.logger.logger.error('Token is missing for email confirmation');
      throw new HttpException('Token is required', HttpStatus.BAD_REQUEST);
    }

    try {
      this.authCommon.verifyJWT(token);
      this.logger.logger.info('JWT verified successfully', { token });
    } catch (error) {
      this.logger.logger.error('Invalid JWT during email confirmation', {
        error,
      });
      throw new HttpException('Invalid token', HttpStatus.BAD_REQUEST);
    }

    const existingUser = await this.prismaCommon.getExistingUserByToken(token);

    if (!existingUser || existingUser.isEmailVerified) {
      this.logger.logger.error('User not found or already verified', { token });
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    try {
      await this.prisma.user.update({
        data: { token: null, isEmailVerified: true },
        where: { token },
      });
      this.logger.logger.info('User email verified successfully', {
        userId: existingUser.id,
      });
    } catch (error) {
      this.logger.logger.error(
        'Error updating user during email verification',
        { error },
      );
      throw new HttpException('Invalid token', HttpStatus.BAD_REQUEST);
    }
  }

  async createAccount(data: CreateAccountDTO, lang: $Enums.Lang) {
    const existingUser = await this.prismaCommon.getExistingUserByEmail(
      data.email,
    );

    if (existingUser) {
      this.logger.logger.error(
        'Attempt to create account with existing email',
        { email: data.email },
      );
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }

    const token = this.authCommon.getJWT();
    const url = `${this.config.clientUrl}/${lang}/auth/account/confirm?token=${token}`;

    try {
      const newUser = await this.prisma.user.create({
        data: {
          username: data.username,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          password: this.authCommon.hashPassword(data.password),
          token,
          preferences: { create: { language: lang } },
        },
      });
      this.logger.logger.info('User account created successfully', {
        userId: newUser.id,
      });
    } catch (error) {
      this.logger.logger.error('Unexpected error during account creation', {
        error,
      });
      throw new HttpException(
        'An unexpected error occurred while creating the user.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    await this.email.sendMail(
      getCreateAccountEmail({
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        url,
        lang,
      }),
    );
    this.logger.logger.info('Confirmation email sent successfully', {
      email: data.email,
    });
  }

  async refreshToken(data: EmailDTO, lang: $Enums.Lang) {
    const existingUser = await this.prismaCommon.getExistingUserByEmail(
      data.email,
    );

    if (!existingUser) {
      this.logger.logger.error(
        'Attempt to refresh token for non-existing user',
        { email: data.email },
      );
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    if (existingUser.isEmailVerified) {
      this.logger.logger.info('Attempt to refresh token for verified user', {
        email: data.email,
      });
      throw new HttpException('User account is confirmed', HttpStatus.CONFLICT);
    }

    const token = this.authCommon.getJWT();
    const url = `${this.config.clientUrl}/${lang}/auth/account/confirm?token=${token}`;

    await this.prisma.user.update({
      data: { token },
      where: { id: existingUser.id },
    });
    this.logger.logger.info('Token refreshed successfully', {
      userId: existingUser.id,
    });

    await this.email.sendMail(
      getCreateAccountEmail({
        email: existingUser.email,
        firstName: existingUser.firstName,
        lastName: existingUser.lastName,
        url,
        lang,
      }),
    );
    this.logger.logger.info('Confirmation email resent successfully', {
      email: existingUser.email,
    });
  }
}
