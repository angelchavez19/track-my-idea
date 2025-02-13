import { $Enums } from '@prisma/client';

export interface UserPayloadI {
  id: number;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

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
