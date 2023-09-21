import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString } from 'class-validator';

export class UpdateSectionDTO {
  @ApiPropertyOptional({
    type: String,
  })
  @IsOptional()
  @IsString()
  title: string;

  @ApiPropertyOptional({
    type: Array,
  })
  @IsOptional()
  @IsArray()
  video: string[];

  @ApiPropertyOptional({
    type: String,
  })
  @IsOptional()
  @IsString()
  description: string;
}
