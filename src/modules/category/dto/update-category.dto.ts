import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateCategoryDTO {
  @ApiProperty({
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    type: String,
  })
  @IsOptional()
  @IsString()
  newName: string;

  @ApiPropertyOptional({
    type: String,
  })
  @IsOptional()
  @IsString()
  thumbnail: string;
}
