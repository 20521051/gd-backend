import { Degree, Gender } from '@/types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsString } from 'class-validator';

export class UpdateUserDTO {
  @ApiPropertyOptional({
    type: String,
  })
  @IsString()
  email: string;

  @ApiPropertyOptional({
    type: String,
  })
  @IsString()
  name: string;

  @ApiPropertyOptional({
    type: String,
    enum: Gender,
  })
  @IsString()
  gender: Gender;

  @ApiPropertyOptional({
    type: String,
    enum: Degree,
  })
  @IsString()
  degree: Degree;

  @ApiPropertyOptional({
    type: String,
  })
  @IsDateString()
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
