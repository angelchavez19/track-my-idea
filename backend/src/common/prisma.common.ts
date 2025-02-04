import { Injectable } from '@nestjs/common';
import { $Enums } from '@prisma/client';
import { PrismaService } from 'src/providers/prisma/prisma';

export interface ExistingUserI {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  provider: $Enums.Provider;
  role: $Enums.Role;
  isEmailVerified: boolean;
  twoFactorSecret: string;
  twoFactorIV: string;
  twoFactorEnabled: boolean;
}

@Injectable()
export class PrismaCommonService {
  constructor(private prisma: PrismaService) {}

  selectExistingUser = {
    id: true,
    username: true,
    firstName: true,
    lastName: true,
    email: true,
    isEmailVerified: true,
    password: true,
    provider: true,
    twoFactorSecret: true,
    twoFactorIV: true,
    twoFactorEnabled: true,
  };

  getExistingUserByEmail(email: string) {
    return this.prisma.user.findUnique({
      select: this.selectExistingUser,
      where: { email },
    });
  }

  getExistingUserByToken(token: string) {
    return this.prisma.user.findUnique({ where: { token } });
  }

  getExistingUserById(id: number) {
    return this.prisma.user.findUnique({
      select: this.selectExistingUser,
      where: { id },
    });
  }
}
