import { ApiProperty } from '@nestjs/swagger';

export class ErrorDataDto {
  @ApiProperty({
    description:
      'Message of the error. If you catches 500 it send err.message of try-catch block',
    example: 'Some error message',
  })
  message: string;
  @ApiProperty({
    description: 'Validation errors. It generates if response code was 400.',
    example: [
      "It's only for examples in 400 error case",
      "Password can't be less than 8 symbols",
      "Username can't be a email",
    ],
    type: [String],
  })
  validationErrors?: string[];
}
