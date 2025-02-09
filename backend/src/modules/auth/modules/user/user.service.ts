import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/providers/prisma/prisma';
import { UserPayloadI } from 'src/types/user.type';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getInfoUser(user: UserPayloadI) {
    if (!user)
      throw new HttpException('User not authenticated', HttpStatus.FORBIDDEN);

    return await this.prisma.user.findUnique({
      select: {
        id: true,
        username: true,
        firstName: true,
        lastName: true,
        profileImage: true,
        email: true,
        createdAt: true,
        preferences: {
          select: {
            language: true,
          },
        },
      },
      where: {
        id: user.id,
      },
    });
  }
}
