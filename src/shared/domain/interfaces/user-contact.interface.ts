import { ApiProperty } from '@nestjs/swagger';
import { IUser, UserDocData } from '../../../modules/user/domain/user.interface';

export interface IUserContact {
  id?: string;
  userId: string;
  user?: IUser;
  title: string;
  description?: string;
  mediaType: string;
  link: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export abstract class UserContactDoc implements IUserContact {
  @ApiProperty({
    description: "ID of user's contact. It is a UUID v4.",
    example: '610ccd5e-fc43-42a7-80c6-d9561872c217',
  })
  id?: string;

  @ApiProperty({
    description: 'ID of linked user to this contact. It is a UUID v4.',
    example: '610ccd5e-fc43-42a7-80c6-d9561872c213',
  })
  userId: string;

  @ApiProperty({
    type: UserDocData,
  })
  user?: IUser;

  @ApiProperty({
    description: 'Title of the contact',
    example: 'My GitHub',
  })
  title: string;

  @ApiProperty({
    description: 'Description of the contact',
    example: 'There you can see my repos',
  })
  description?: string;

  @ApiProperty({
    description:
      'Type of external resource. Needs for icon changing in the website.',
    example: 'github',
  })
  mediaType: string;

  @ApiProperty({
    description: 'Link to external resource',
    example: 'https://github.com/DES-Destry',
  })
  link: string;

  @ApiProperty({
    description: "Date of user's contact creating.",
    example: new Date(),
  })
  createdAt?: Date;

  @ApiProperty({
    description: "Date of user's contact fields changing.",
    example: new Date(),
  })
  updatedAt?: Date;
}
