import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateNotificationDTO {
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
  from: string;

  @ApiPropertyOptional({
    type: String,
  })
  @IsOptional()
  @IsString()
  to: string;

  @ApiPropertyOptional({
    type: String,
  })
  @IsOptional()
  @IsString()
  content: string;

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
  link: string;
}
