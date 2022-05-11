import { IUserEmail } from 'src/shared/domain/interfaces/user-email.interface';
import { DateAudit } from 'src/shared/entities/date-audit';
import { UserEntity } from 'src/user/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { UserEmailIdentityEntity } from './modules/identity/identity.entity';

@Entity('user_emails')
export class UserEmailEntity extends DateAudit implements IUserEmail {
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
