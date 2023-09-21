import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class NotificationDTO {
  @ApiProperty({
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiPropertyOptional({
    type: String,
  })
  @IsOptional()
  @IsString()
  from: string;

  @ApiProperty({
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  to: string;

  @ApiProperty({
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiProperty({
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  thumbnail: string;

  @ApiProperty({
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  link: string;
}
