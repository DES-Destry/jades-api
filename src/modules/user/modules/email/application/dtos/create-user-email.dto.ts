import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateUserEmailRequestDto {
  @ApiProperty({
    description: 'Email that user want to create.',
    example: 'test@example.ua',
  })
  @IsNotEmpty({ message: 'Email must be not empty' })
  @IsString({ message: 'Email must be a string' })
  @IsEmail()
  email: string;

  @ApiProperty({
    description:
      "Email is main? If it's true - users main email will set as secondary, and new email will be main.",
    example: false,
    required: false,
  })
  @IsOptional()
  @IsBoolean({ message: 'isMain field must be a boolean' })
  isMain?: boolean;
}

export class CreateUserEmailResponseDto {
  @ApiProperty({
    description: 'Id of created email. It is a UUID v4.',
    example: '610ccd5e-fc43-42a7-80c6-d9561872c213',
  })
  emailId: string;

  @ApiProperty({
    description: 'Id of created identity of the new email. It is a UUID v4.',
    example: '610ccd5e-fc43-42a7-80c6-d9561872c214',
  })
  emailIdentityId: string;
}

export class CreateUserEmailResponseDoc {
  @ApiProperty()
  data: CreateUserEmailResponseDto;

  @ApiProperty({
    description: 'True if request was successful.',
    example: true,
  })
  isOk: boolean;
}
