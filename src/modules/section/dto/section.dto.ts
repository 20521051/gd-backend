import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class SectionDTO {
  @ApiProperty({
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    type: Array,
  })
  @IsNotEmpty()
  @IsArray()
  video: string[];

  @ApiProperty({
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  description: string;
}
