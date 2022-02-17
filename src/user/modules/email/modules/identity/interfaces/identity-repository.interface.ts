import { IUserEmailIdentity } from 'src/shared/domain/interfaces/user-email-identity.interface';

export interface IUserEmailIdentityRepository {
  getById(identityId: string): Promise<IUserEmailIdentity>;

  createIdentity(emailId: string, code: string): Promise<IUserEmailIdentity>;
  verifyIdentity(identityId: string, code: string): Promise<boolean>;
}
