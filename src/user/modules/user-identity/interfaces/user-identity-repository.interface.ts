import { IUserIdentity } from 'src/shared/domain/interfaces/user-identity.interface';

export interface IUserIdentityRepository {
  getById(identityId: string): Promise<IUserIdentity>;

  createIdentity(userId: string, code: string): Promise<IUserIdentity>;
  verifyIdentity(identityId: string, code: string): Promise<boolean>;
}
