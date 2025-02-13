import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/providers/prisma/prisma';

@Injectable()
export class PrismaCommonService {
  constructor(private prisma: PrismaService) {}

  selectExistingUser = {
    id: true,
    username: true,
    firstName: true,
    lastName: true,
    email: true,
    password: true,
    provider: true,
    role: true,
    isEmailVerified: true,
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
    return this.prisma.user.findUnique({
      select: this.selectExistingUser,
      where: { token },
    });
  }

  getExistingUserById(id: number) {
    return this.prisma.user.findUnique({
      select: this.selectExistingUser,
      where: { id },
    });
  }
}
