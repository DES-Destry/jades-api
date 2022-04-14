import { IUserEmailIdentity } from 'src/shared/domain/interfaces/user-email-identity.interface';
import { IUserEmail } from 'src/shared/domain/interfaces/user-email.interface';
import { IUser } from 'src/shared/domain/interfaces/user.interface';
import { DateAudit } from 'src/shared/entities/date-audit';
import { Column, Entity } from 'typeorm';

@Entity('user_emails')
export class UserEmailEntity extends DateAudit implements IUserEmail {
  @Column('varchar', { name: 'user_id' })
  userId: string;
  user?: IUser; // TODO UserEntity

  @Column('varchar')
  email: string;

  @Column('bool', { name: 'is_main', default: false })
  isMain: boolean;

  @Column('bool', { name: 'is_visible', default: false })
  isVisible: boolean;

  identity?: IUserEmailIdentity; // TODO UserEmailIdentityEntity
}
