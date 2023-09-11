import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString } from 'class-validator';

export class UpdateCommentDTO {
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
}
