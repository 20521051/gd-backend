import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { modelTypes } from '@prisma/client';
import { IsArray, IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CommentDTO {
  @ApiProperty({
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  owner: string;

  @ApiPropertyOptional({
    type: String,
  })
  @IsString()
  @IsOptional()
  content: string;

  @ApiProperty({
    type: Array,
  })
  @IsArray()
  image: string[];

  @ApiProperty({
    type: modelTypes,
  })
  @IsNotEmpty()
  about: modelTypes;

  @ApiProperty({
    type: Boolean,
  })
  @IsNotEmpty()
  @IsBoolean()
  isHelpful: boolean;

  @ApiProperty({
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  at: string;

  @ApiProperty({
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  parent: string;
}
