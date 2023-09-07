import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateCommentDTO {
  @ApiPropertyOptional({
    type: String,
  })
  @IsString()
  @IsOptional()
  content: string;

  @ApiPropertyOptional({
    type: String,
  })
  @IsString()
  @IsOptional()
  image: string;
}
