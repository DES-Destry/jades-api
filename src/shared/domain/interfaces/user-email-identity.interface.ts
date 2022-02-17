import { IUserEmail } from './user-email.interface';

export interface IUserEmailIdentity {
  id?: string;
  emailId: string;
  email?: IUserEmail;
  verificationCode: string;
  isVerified: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
