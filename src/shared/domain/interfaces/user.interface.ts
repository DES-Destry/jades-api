import { UserGender } from '../common/user-gender';
import { IRole } from './role.interface';
import { IUserContact } from './user-contact.interface';
import { IUserEmail } from './user-email.interface';
import { IUserIdentity } from './user-identity.interface';

export interface IUser {
  id?: string;
  username: string;
  alias?: string;
  urlAlias?: string;
  description?: string;
  gender: UserGender;
  emails: IUserEmail[];
  password: string;
  karma: number;
  location?: string;
  roleId?: string;
  role?: IRole;
  contacts: IUserContact[];
  userIdentities: IUserIdentity[];
  isVerified: boolean;
  lastPasswordChanged: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
