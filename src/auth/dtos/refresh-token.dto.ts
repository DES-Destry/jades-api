import { ApiProperty } from '@nestjs/swagger';
import { IsJWT } from 'class-validator';

export class RefreshTokenRequestDto {
  @ApiProperty({
    description:
      "Refresh token used to refresh expired or stolen access token. If you got 403 error on authentication, just try to use refresh token to get new access token. In case, when refresh token already expired or used, then you can't use it again. Lives very long time.",
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFkNmNkYjE5L...',
  })
  @IsJWT({ message: 'Refresh token must be a JWT token' })
  refreshToken: string;
}
