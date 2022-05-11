import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class DeleteUserEmailRequestDto {
  @ApiProperty({
    description: 'Id of email to delete. It is a UUID v4.',
    example: '610ccd5e-fc43-42a7-80c6-d9561872c213',
  })
  @IsNotEmpty({ message: 'Email ID must be not empty' })
  @IsString({ message: 'Email ID must be a string' })
  @IsUUID(4, { message: 'Email ID must be a UUIDv4' })
  emailId: string;
}

export class DeleteUserEmailResponseDto {
  @ApiProperty({
    description:
      'If user email was deleted successfully. Main email should not delete.',
    example: true,
  })
  isDeleted: boolean;
}

export class DeleteUserEmailResponseDoc {
  @ApiProperty()
  data: DeleteUserEmailResponseDto;

  @ApiProperty({
    description: 'True if request was successful.',
    example: true,
  })
  isOk: boolean;
}
