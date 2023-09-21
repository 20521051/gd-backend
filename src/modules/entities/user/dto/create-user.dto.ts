import { Gender, Job } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreateUserDTO {
  @ApiProperty({
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  userName: string;

  @ApiProperty({
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
    message:
      'Password must contain at least 1 letter, 1 number, 1 special character, and be at least 8 characters long',
  })
  password: string;

  @ApiProperty({
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  gender: Gender;

  @ApiProperty({
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  birthday: string;

  @ApiProperty({
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  job: Job;

  @ApiProperty({
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  phone: string;
}
