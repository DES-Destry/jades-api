import { UserGender } from 'src/shared/domain/common/user-gender';
import { UserScope } from 'src/shared/domain/common/user-interests';
import { IUser } from 'src/shared/domain/interfaces/user.interface';
import { DateAudit } from 'src/shared/entities/date-audit';
import {
  Entity,
  Column,
  OneToMany,
  JoinTable,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UserContactEntity } from './modules/contact/contact.entity';
import { UserEmailEntity } from './modules/email/email.entity';
import { UserRoleEntity } from './modules/role/role.entity';

@Entity('users')
export class UserEntity extends DateAudit implements IUser {
  @Column('varchar', { unique: true })
  username: string;

  @Column('varchar', { nullable: true })
  alias?: string;

  @Column('varchar', { name: 'url_alias', nullable: true, unique: true })
  urlAlias?: string;

  @Column('varchar', { nullable: true })
  description?: string;

  @Column('enum', { enum: UserGender })
  gender: UserGender;

  @OneToMany(() => UserEmailEntity, (entity) => entity.user)
  @JoinTable()
  emails: UserEmailEntity[];

  @Column('varchar')
  password: string;

  @Column('int')
  karma: number;

  @Column('varchar', { nullable: true })
  location?: string;

  @Column('varchar', { name: 'role_id', nullable: true })
  roleId?: string;

  @ManyToOne(() => UserRoleEntity, (entity) => entity.users)
  @JoinColumn({ name: 'role_id' })
  role?: UserRoleEntity;

  @OneToMany(() => UserContactEntity, (entity) => entity.user)
  @JoinTable()
  contacts: UserContactEntity[];

  @Column('enum', { enum: UserScope })
  scope: UserScope;

  @Column('varchar', { nullable: true })
  company?: string;

  @Column('timestamp', { name: 'last_password_changed_at' })
  lastPasswordChangedAt: Date;
}
