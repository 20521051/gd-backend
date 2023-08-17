import { Gender, Job } from '@/types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDTO {
  @ApiProperty({
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  username: string;

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
    enum: Gender,
  })
  @IsNotEmpty()
  @IsString()
  gender: Gender;

  @ApiProperty({
    type: String,
  })
  @IsNotEmpty()
  birthday: string;

  @ApiProperty({
    type: String,
    enum: Job,
  })
  @IsNotEmpty()
  job: Job;

  @ApiProperty({
    type: String,
  })
  @IsNotEmpty()
  phone: string;
}
