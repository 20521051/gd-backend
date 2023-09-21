import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateVideoDTO {
  @ApiPropertyOptional({
    type: String,
  })
  @IsOptional()
  @IsString()
  title: string;

  @ApiPropertyOptional({
    type: Number,
  })
  @IsOptional()
  @IsNumber()
  time: number;

  @ApiPropertyOptional({
    type: String,
  })
  @IsOptional()
  @IsString()
  link: string;

  @ApiPropertyOptional({
    type: String,
  })
  @IsOptional()
  @IsString()
  description: string;
}
