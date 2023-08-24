import { Degree, Gender } from '@prisma/client';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class UpdateUserDTO {
  @ApiPropertyOptional({
    type: String,
  })
  @IsEmail()
  email: string;

  @ApiPropertyOptional({
    type: String,
  })
  @IsString()
  name: string;

  @ApiPropertyOptional({
    type: String,
  })
  @IsString()
  gender: Gender;

  @ApiPropertyOptional({
    type: String,
  })
  @IsString()
  degree: Degree;

  @ApiPropertyOptional({
    type: String,
  })
  @IsString()
  birthday: string;

  @ApiPropertyOptional({
    type: String,
  })
  @IsString()
  avatar: string;

  @ApiPropertyOptional({
    type: String,
  })
  @IsString()
  wallet: string;
}
