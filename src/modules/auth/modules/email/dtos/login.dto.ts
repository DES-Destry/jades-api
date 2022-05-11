import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class LoginRequestDto {
  @ApiProperty({
    description:
      'Login to enter in the system. It can be a username or one of emails.',
    example: 'username/email',
    examples: ['Destry.Unimaster', 'test@example.ua'],
  })
  @IsNotEmpty({ message: 'Login must be not empty' })
  @IsString({ message: 'Login must be a string' })
  @MaxLength(255, {
    message:
      'Login is too large to endpoint executing (255 symbols constraint)',
  })
  login: string;

  @ApiProperty({
    description: 'Password to enter in the system.',
    example: '7bB1f@71a25',
  })
  @IsNotEmpty({ message: 'Password must be not empty' })
  @IsString({ message: 'Password must be a string' })
  @MaxLength(255, {
    message:
      'Password is too large to endpoint executing (255 symbols constraint)',
  })
  password: string;
}
