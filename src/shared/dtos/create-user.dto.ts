import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description:
      "Username of new user. It's very important field. On it depends user authorization and user finding in website(in the nested user with params). Must be not email!!!",
    example: 'Destry.Unimaster',
  })
  username: string;

  @ApiProperty({
    description:
      'User email linked to this user and used to verification of user via code. User can have a lot of emails. Email on creation automatically should be primary and invisible for others users. It can be changed later in settings. Must be a valid email!!!',
    example: 'test@example.ua',
  })
  email: string;

  @ApiProperty({
    description:
      "User's password. Protects account, standard password. Cannot be less than 8 symbols and must have Caps letters, numbers and special digits!!!",
    example: '7bB1f@71a25',
  })
  password: string;
  // TODO
  // interestedIn: Interests;
  // company: string;
}
