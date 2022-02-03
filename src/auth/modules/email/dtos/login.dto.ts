import { ApiProperty } from '@nestjs/swagger';

export class LoginRequestDto {
  @ApiProperty({
    description:
      'Login to enter in the system. It can be a username or one of emails.',
    example: 'username/email',
    examples: ['Destry.Unimaster', 'test@example.ua'],
  })
  login: string;

  @ApiProperty({
    description:
      'Password to enter in the system. It can be a username or one of emails.',
    example: '7bB1f@71a25',
  })
  password: string;
}
