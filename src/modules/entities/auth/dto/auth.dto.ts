import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AuthDTO {
  @ApiPropertyOptional({
    type: String,
  })
  @IsString()
  @IsOptional()
  userName: string;

  @ApiProperty({
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiPropertyOptional({
    type: String,
  })
  @IsString()
  @IsOptional()
  phone: string;

  @ApiPropertyOptional({
    type: String,
  })
  @IsString()
  @IsOptional()
  email: string;

  @ApiPropertyOptional({
    type: String,
  })
  @IsString()
  @IsOptional()
  wallet: string;
}
