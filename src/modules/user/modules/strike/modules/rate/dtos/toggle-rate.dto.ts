import { ApiProperty } from '@nestjs/swagger';

export class ToggleRateResponseDto {
  @ApiProperty({
    description:
      'If like/dislike not exists and it added to database - return true. If like/dislike exists and it was removed from db - return false',
    example: true,
  })
  isRateAdded: boolean;
}

export class ToggleRateResponseDoc {
  @ApiProperty()
  data: ToggleRateResponseDto;

  @ApiProperty({
    description: 'True if request was successful.',
    example: true,
  })
  isOk: boolean;
}
