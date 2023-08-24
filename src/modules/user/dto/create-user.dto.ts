import { Gender, Job } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

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
