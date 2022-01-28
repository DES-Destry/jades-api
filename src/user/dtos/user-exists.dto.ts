import { ApiProperty } from '@nestjs/swagger';

export class UserExistsResponseDto {
  @ApiProperty({
    description: 'If user with this parameters exists - value equals true.',
    example: true,
  })
  exists: boolean;
}

export class UserExistsResponseDoc {
  @ApiProperty()
  data: UserExistsResponseDto;

  @ApiProperty({
    description: 'True if request was successful.',
    example: true,
  })
  isOk: boolean;
}
