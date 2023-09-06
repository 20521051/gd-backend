import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateCourseDTO {
  @ApiPropertyOptional({
    type: String,
  })
  @IsOptional()
  @IsString()
  name: string;

  @ApiPropertyOptional({
    type: String,
  })
  @IsOptional()
  @IsString()
  owner: string;

  @ApiPropertyOptional({
    type: String,
  })
  @IsOptional()
  @IsString()
  thumbnail: string;

  @ApiPropertyOptional({
    type: String,
  })
  @IsOptional()
  @IsString()
  section: string;

  @ApiPropertyOptional({
    type: Number,
  })
  @IsOptional()
  @IsNumber()
  rate: number;

  @ApiPropertyOptional({
    type: Number,
  })
  @IsOptional()
  @IsNumber()
  price: number;

  @ApiPropertyOptional({
    type: Number,
  })
  @IsOptional()
  @IsNumber()
  numberOfFollow: number;
}
