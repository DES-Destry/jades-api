import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class ToggleVisibleUserEmailRequestDto {
  @ApiProperty({
    description:
      'Email id, where user want to change visibility status. It is a UUID v4.',
    example: '610ccd5e-fc43-42a7-80c6-d9561872c213',
  })
  @IsNotEmpty({ message: 'Email ID must be not empty' })
  @IsString({ message: 'Email ID must be a string' })
  @IsUUID(4, { message: 'Email ID must be a UUIDv4' })
  emailId: string;
}
