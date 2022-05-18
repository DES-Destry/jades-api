import { IUserEmail } from 'src/modules/user/modules/email/domain/email.interface';
import { BaseDateEntity } from 'src/shared/ddd/infrastructure/database/base-classes/base-date-entity';
import { UserEntity } from 'src/modules/user/infrastructure/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { UserEmailIdentityEntity } from '../modules/identity/identity.entity';

@Entity('user_emails')
export class UserEmailEntity extends BaseDateEntity implements IUserEmail {
  @Column('uuid', { name: 'user_id' })
  userId: string;

  @ManyToOne(() => UserEntity, (entity) => entity.emails)
  @JoinColumn({ name: 'user_id' })
  user?: UserEntity;

  @Column('varchar')
  email: string;

  @Column('bool', { name: 'is_main', default: false })
  isMain: boolean;

  @Column('bool', { name: 'is_visible', default: false })
  isVisible: boolean;

  @OneToOne(() => UserEmailIdentityEntity, (entity) => entity.email)
  identity?: UserEmailIdentityEntity;
}
