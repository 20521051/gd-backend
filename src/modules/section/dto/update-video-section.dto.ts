import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateVideoSectionDTO {
  @ApiProperty({
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  video: string;

  @ApiPropertyOptional({
    type: Number,
  })
  @IsOptional()
  @IsNumber()
  index: number;
}
