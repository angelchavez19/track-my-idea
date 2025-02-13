import {
  IsString,
  IsEmail,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';

export class CreateAccountDTO {
  @IsString()
  @MinLength(1, { message: 'First name must be at least 1 characters long.' })
  @MaxLength(50, { message: 'First name must not exceed 50 characters.' })
  firstName: string;

  @IsString()
  @MinLength(1, { message: 'Last name must be at least 1 characters long.' })
  @MaxLength(50, { message: 'Last name must not exceed 50 characters.' })
  lastName: string;

  @IsString()
  @MinLength(3, { message: 'Username must be at least 3 character long.' })
  @MaxLength(30, { message: 'Username must not exceed 30 characters.' })
  @Matches(/^[a-zA-Z0-9-_]+$/, {
    message:
      'Username can only contain letters, numbers, hyphens, and underscores. No spaces or Unicode characters are allowed.',
  })
  username: string;

  @IsEmail({}, { message: 'Invalid email format.' })
  email: string;

  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long.' })
  @MaxLength(72, { message: 'Password must not exceed 72 characters.' })
  @Matches(
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,72}$/,
    {
      message:
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
    },
  )
  @Matches(/^[\x20-\x7E]+$/, {
    message: 'Password must not contain Unicode or invalid characters.',
  })
  password: string;
}
