import { IUserEmailIdentity } from 'src/shared/domain/interfaces/user-email-identity.interface';
import { DateAudit } from 'src/shared/date-audit';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { UserEmailEntity } from '../../email.entity';

@Entity('user_email_identities')
export class UserEmailIdentityEntity
  extends DateAudit
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
