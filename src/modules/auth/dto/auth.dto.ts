import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AuthDTO {
  @ApiPropertyOptional({
    type: String,
  })
  @IsString()
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
  phone: string;

  @ApiPropertyOptional({
    type: String,
  })
  @IsString()
  email: string;

  @ApiPropertyOptional({
    type: String,
  })
  @IsString()
  wallet: string;
}
