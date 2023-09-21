import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches } from 'class-validator';

export class UpdatePasswordUserDTO {
  @ApiProperty({
    type: String,
  })
  @IsString()
  id: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  password: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
    message:
      'Password must contain at least 1 letter, 1 number, 1 special character, and be at least 8 characters long',
  })
  newPassword: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  conformNewPassword: string;
}
