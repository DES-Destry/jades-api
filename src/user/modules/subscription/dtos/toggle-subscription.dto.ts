import { ApiProperty } from '@nestjs/swagger';

export class ToggleSubscriptionRequestDto {
  @ApiProperty({
    description: 'ID of user on to which authorized user subscribe.',
    example: '610ccd5e-fc43-42a7-80c6-d9561872c213',
  })
  writerId: string;
}

export class ToggleSubscriptionResponseDto {
  @ApiProperty({
    description: 'If subscription was added - return true.',
    example: true,
  })
  isSubscribed: boolean;
}

export class ToggleSubscriptionResponseDoc {
  @ApiProperty()
  data: ToggleSubscriptionResponseDto;

  @ApiProperty({
    description: 'True if request was successful.',
    example: true,
  })
  isOk: boolean;
}
