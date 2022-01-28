import { ApiProperty } from '@nestjs/swagger';
import { ErrorDataDto } from './error-data.dto';

export class ErrorDataDoc {
  @ApiProperty()
  data: ErrorDataDto;

  @ApiProperty({
    description: 'True if request was successful.',
    example: true,
  })
  isOk: boolean;
}
