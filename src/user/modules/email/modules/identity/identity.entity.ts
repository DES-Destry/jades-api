import { IUserEmailIdentity } from 'src/shared/domain/interfaces/user-email-identity.interface';
import { IUserEmail } from 'src/shared/domain/interfaces/user-email.interface';
import { DateAudit } from 'src/shared/entities/date-audit';
import { Column, Entity } from 'typeorm';

@Entity('user_email_identities')
export class UserEmailsIdentityEntity
  extends DateAudit
  implements IUserEmailIdentity
{
  @Column('varchar', { name: 'email_id' })
  emailId: string;
  email?: IUserEmail; // TODO UserEmailEntity

  @Column('varchar', { name: 'verification_code' })
  verificationCode: string;

  @Column('bool', { name: 'is_verified' })
  isVerified: boolean;
}
