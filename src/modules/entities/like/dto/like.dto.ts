import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LikeDTO {
  @ApiProperty({
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  userId: string;

  @ApiProperty({
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  commentId: string;

  @ApiProperty({
    type: Boolean,
  })
  @IsNotEmpty()
  @IsString()
  isLike: boolean;
}
