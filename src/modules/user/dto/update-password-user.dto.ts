import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdatePasswordUserDTO {
  @ApiProperty({
    type: String,
  })
  @IsString()
  id: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  password: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  newPassword: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  conformNewPassword: string;
}
