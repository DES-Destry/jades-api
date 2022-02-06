import { ApiProperty } from '@nestjs/swagger';
import { IUser, UserDocData } from './user.interface';

export interface IUserEmail {
  id?: string;
  userId: string;
  user?: IUser;
  email: string;
  isMain: boolean;
  isVisible: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export abstract class UserEmailDoc implements IUserEmail {
  @ApiProperty({
    description: 'ID of email',
    example: '610ccd5e-fc43-42a7-80c6-d9561872c214',
  })
  id?: string;

  @ApiProperty({
    description: 'ID of user that owns this email',
    example: '610ccd5e-fc43-42a7-80c6-d9561872c213',
  })
  userId: string;

  @ApiProperty({
    type: UserDocData,
  })
  user?: IUser;

  @ApiProperty({
    description: "User's email - all simple.",
    example: 'test@example.ua',
  })
  email: string;

  @ApiProperty({
    description:
      'Main email. For user it can be only 1. This email have more privileges to use. It sets to default for email of new created user.',
    example: true,
  })
  isMain: boolean;

  @ApiProperty({
    description: "If email is hidden - don't show this for other users.",
    example: false,
  })
  isVisible: boolean;

  @ApiProperty({
    description: "Date of email's creating.",
    example: new Date(),
  })
  createdAt?: Date;

  @ApiProperty({
    description:
      "Date of email's fields changing. Changes when any parameters of user was changed.",
    example: new Date(),
  })
  updatedAt?: Date;
}
