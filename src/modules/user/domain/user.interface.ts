import { UserGender } from '../../../shared/domain/common/user-gender';
import { UserScope } from '../../../shared/domain/common/user-interests';
import { IUserEmail } from 'src/modules/user/modules/email/domain/email.interface';
import { IUserRole } from 'src/shared/domain/interfaces/user-role.interface';
import { IUserContact } from 'src/shared/domain/interfaces/user-contact.interface';
import { Credentials } from './value-objects/credentials.vo';
import { Location } from './value-objects/location.vo';

export interface IUser {
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
