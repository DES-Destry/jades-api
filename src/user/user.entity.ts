import { UserGender } from 'src/shared/domain/common/user-gender';
import { UserScope } from 'src/shared/domain/common/user-interests';
import { IUserContact } from 'src/shared/domain/interfaces/user-contact.interface';
import { IUserEmail } from 'src/shared/domain/interfaces/user-email.interface';
import { IUserRole } from 'src/shared/domain/interfaces/user-role.interface';
import { IUser } from 'src/shared/domain/interfaces/user.interface';
import { DateAudit } from 'src/shared/entities/date-audit';
import { Entity, Column } from 'typeorm';

@Entity('users')
export class UserEntity extends DateAudit implements IUser {
  @Column('varchar')
  username: string;

  @Column('varchar', { nullable: true })
  alias?: string;

  @Column('varchar', { name: 'url_alias', nullable: true })
  urlAlias?: string;

  @Column('varchar', { nullable: true })
  description?: string;

  @Column('enum', { enum: UserGender })
  gender: UserGender;

  emails: IUserEmail[]; // TODO UserEmailEntity

  @Column('varchar')
  password: string;

  @Column('int')
  karma: number;

  @Column('varchar', { nullable: true })
  location?: string;

  @Column('varchar', { name: 'role_id', nullable: true })
  roleId?: string;

  role?: IUserRole; // TODO UserRoleEntity
  contacts: IUserContact[]; // TODO UserContactEntity

  @Column('enum', { enum: UserScope })
  scope: UserScope;

  @Column('varchar', { nullable: true })
  company?: string;

  @Column('timestamp', { name: 'last_password_changed_at' })
  lastPasswordChanged: Date;
}
