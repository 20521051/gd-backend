import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CategoryDTO {
  @ApiProperty({
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiPropertyOptional({
    type: String,
  })
  @IsOptional()
  @IsString()
  thumbnail: string;

}
