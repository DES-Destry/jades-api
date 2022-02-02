import { ApiProperty } from '@nestjs/swagger';

export class AuthorizedResponseDto {
  @ApiProperty({
    description:
      'Access token, that authenticate a user in the system. Some operations cannot execute without this token. Some operation can accept token for additional info, but not require. Lives very short time.',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFkNmNkYjE5L...',
  })
  accessToken: string;

  @ApiProperty({
    description:
      "Refresh token used to refresh expired or stolen access token. If you got 403 error on authentication, just try to use refresh token to get new access token. In case, when refresh token already expired or used, then you can't use it again. Lives very long time.",
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFkNmNkYjE5L...',
  })
  refreshToken: string;

  @ApiProperty({
    description: "User ID of authorized user in the system. It's a uuid hash.",
    example: '610ccd5e-fc43-42a7-80c6-d9561872c213',
  })
  userId: string;
}

export class AuthorizedResponseDoc {
  @ApiProperty()
  data: AuthorizedResponseDto;

  @ApiProperty({
    description: 'True if request was successful.',
    example: true,
  })
  isOk: boolean;
}
