import { IUserEmail } from '../../../modules/user/modules/email/domain/email.interface';

export interface IUserEmailIdentity {
  id?: string;
  emailId: string;
  email?: IUserEmail;
  verificationCode: string;
  isVerified: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
