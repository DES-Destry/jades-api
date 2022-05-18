import { IUserEmailIdentity } from 'src/shared/domain/interfaces/user-email-identity.interface';
import { BaseDateEntity } from 'src/shared/ddd/infrastructure/database/base-classes/base-date-entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { UserEmailEntity } from '../../infrastructure/email.entity';

@Entity('user_email_identities')
export class UserEmailIdentityEntity
  extends BaseDateEntity
  implements IUserEmailIdentity
{
  @Column('uuid', { name: 'email_id', unique: true })
  emailId: string;

  @OneToOne(() => UserEmailEntity, (entity) => entity.identity)
  @JoinColumn({ name: 'email_id' })
  email?: UserEmailEntity;

  @Column('varchar', { name: 'verification_code' })
  verificationCode: string;

  @Column('bool', { name: 'is_verified' })
  isVerified: boolean;
}
