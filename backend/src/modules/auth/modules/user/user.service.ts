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

  async findUsernameAvailable(username?: string): Promise<string | null> {
    if (!username)
      throw new HttpException('Username is empty', HttpStatus.BAD_REQUEST);

    const MAX_LENGTH = 30;

    username = username.slice(0, MAX_LENGTH);

    const isUsername = await this.prisma.user.findUnique({
      select: { id: true },
      where: { username },
    });

    if (!isUsername) return username;

    let newUsername: string;
    let isTaken: { id: number };
    do {
      const randomSuffix = Math.floor(1000 + Math.random() * 9000).toString();

      const baseUsername = username.slice(0, MAX_LENGTH - randomSuffix.length);
      newUsername = `${baseUsername}${randomSuffix}`;

      isTaken = await this.prisma.user.findUnique({
        select: { id: true },
        where: { username: newUsername },
      });
    } while (isTaken);

    return newUsername;
  }
}
