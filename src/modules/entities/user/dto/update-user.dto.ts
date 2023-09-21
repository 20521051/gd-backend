import { Degree, Gender } from '@prisma/client';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUserDTO {
  @ApiPropertyOptional({
    type: String,
  })
  @IsEmail()
  @IsOptional()
  email: string;

  @ApiPropertyOptional({
    type: String,
  })
  @IsString()
  @IsOptional()
  name: string;

  @ApiPropertyOptional({
    type: String,
  })
  @IsString()
  @IsOptional()
  gender: Gender;

  @ApiPropertyOptional({
    type: String,
  })
  @IsString()
  @IsOptional()
  degree: Degree;

  @ApiPropertyOptional({
    type: String,
  })
  @IsString()
  @IsOptional()
  birthday: string;

  @ApiPropertyOptional({
    type: String,
  })
  @IsString()
  @IsOptional()
  avatar: string;

  @ApiPropertyOptional({
    type: String,
  })
  @IsString()
  @IsOptional()
  wallet: string;
}
