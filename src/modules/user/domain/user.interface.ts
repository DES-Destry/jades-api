import { UserGender } from '../../../shared/domain/common/user-gender';
import { ApiProperty } from '@nestjs/swagger';
import { UserScope } from '../../../shared/domain/common/user-interests';
import {
  IUserEmail,
  UserEmailDoc,
} from 'src/shared/domain/interfaces/user-email.interface';
import {
  IUserRole,
  UserRoleDoc,
} from 'src/shared/domain/interfaces/user-role.interface';
import {
  IUserContact,
  UserContactDoc,
} from 'src/shared/domain/interfaces/user-contact.interface';
import { Credentials } from './value-objects/credentials.vo';
import { Location } from './value-objects/location.vo';

export interface IUser {
  id?: string;
  credentials: Credentials;
  alias?: string;
  urlAlias?: string;
  description?: string;
  gender: UserGender;
  emails: IUserEmail[];
  role?: IUserRole;
  karma: number;
  location?: Location;
  contacts: IUserContact[];
  scope: UserScope;
  company?: string;
  lastPasswordChangedAt: Date;
}

export abstract class UserDocData implements IUser {
  @ApiProperty({
    description: 'ID of user. It is a UUID v4.',
    example: '610ccd5e-fc43-42a7-80c6-d9561872c213',
  })
  id?: string;

  @ApiProperty({
    description: 'Username. Used for enter to the system and finding.',
    example: 'Destry.Unimaster',
  })
  username: string;

  @ApiProperty({
    description:
      "Alias - alternative username. Used only for showing and don't used for enter to the system or finding.",
    example: 'DES-Destry',
  })
  alias?: string;

  @ApiProperty({
    description: 'Url alias. Can used for finding instead of username.',
    example: 'destry_unimaster',
  })
  urlAlias?: string;

  @ApiProperty({
    description:
      "User's description. User can type there anything stuff like about his skills or his life.",
    example:
      "My name is Alan. And I'am a senior Java developer. I've a wife. Help me please.",
  })
  description?: string;

  @ApiProperty({
    description: 'User gender. I must to describe it? Yes, there only two.',
    example: UserGender.Male,
    enum: UserGender,
  })
  gender: UserGender;

  @ApiProperty({
    description:
      'Emails of the user. There have 1 primary mail. Any mails can be a hidden or not.',
    type: [UserEmailDoc],
  })
  emails: IUserEmail[];

  @ApiProperty({
    description:
      "Karma earns by user with likes on posts or comments. All positive user's actions.",
    example: 400,
  })
  karma: number;

  @ApiProperty({
    description: 'Location of the user. User can write where are he from.',
    example: 'Kazakhstan, Astana',
  })
  location?: string;

  @ApiProperty({
    description:
      'ID of the role. By role user have different permissions to ban/delete users/posts/comments.',
    example: '610ccd5e-fc43-42a7-80c6-d9561872c215',
  })
  roleId?: string;

  @ApiProperty({
    description: 'Role object with additional data.',
    type: UserRoleDoc,
  })
  role?: IUserRole;

  @ApiProperty({
    description: "User's links to his other accounts",
    type: [UserContactDoc],
  })
  contacts: IUserContact[];

  @ApiProperty({
    description: "Scope of user's work.",
    example: UserScope.DevOps,
    enum: UserScope,
  })
  scope: UserScope;

  @ApiProperty({
    description: 'Company where user works.',
    example: 'Google Inc.',
  })
  company?: string;

  @ApiProperty({
    description:
      'Date of last password changing. Used to generate user payload, therefore if this value will changed - access token automatically become not valid.',
    example: new Date(),
  })
  lastPasswordChangedAt: Date;

  @ApiProperty({
    description: "Date of user's creating. Register date.",
    example: new Date(),
  })
  createdAt?: Date;

  @ApiProperty({
    description:
      "Date of user's fields changing. Changes when any parameters of user was changed.",
    example: new Date(),
  })
  updatedAt?: Date;
}

export class IUserDoc {
  @ApiProperty()
  data: UserDocData;

  @ApiProperty({
    description: 'True if request was successful.',
    example: true,
  })
  isOk: boolean;
}
