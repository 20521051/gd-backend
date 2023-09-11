import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateExerciseDTO {
  @ApiPropertyOptional({
    type: String,
  })
  @IsOptional()
  @IsString()
  title: string;

  @ApiPropertyOptional({
    type: String,
  })
  @IsOptional()
  @IsString()
  file: string;

  @ApiPropertyOptional({
    type: String,
  })
  @IsOptional()
  @IsString()
  description: string;

  @ApiPropertyOptional({
    type: String,
  })
  @IsOptional()
  @IsString()
  for: string;
}
