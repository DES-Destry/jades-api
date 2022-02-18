import { ApiProperty } from '@nestjs/swagger';

export class VoidResultDto {
  @ApiProperty({
    description: 'If method was executed successfully.',
    example: true,
  })
  executed: boolean;
}

export class VoidResultDoc {
  @ApiProperty()
  data: VoidResultDto;

  @ApiProperty({
    description: 'True if request was successful.',
    example: true,
  })
  isOk: boolean;
}
