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

  async createAccount(
    data: CreateAccountDTO,
    lang: $Enums.Lang = this.config.defaultLang,
  ) {
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
    const url = `${this.config.clientUrl}/auth/account/confirm?token=${token}`;

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
}
