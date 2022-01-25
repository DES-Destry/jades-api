import { InjectModel } from '@nestjs/sequelize';
import { IUserIdentity } from 'src/shared/domain/interfaces/user-identity.interface';
import { UserIdentity } from 'src/shared/domain/user-identity';
import { IUserIdentityRepository } from '../interfaces/user-identity-repository.interface';
import { UserIdentityModel } from '../user-identity.model';

export class UserIdentityRepository implements IUserIdentityRepository {
  constructor(
    @InjectModel(UserIdentityModel)
    private readonly _userIdentityModel: typeof UserIdentityModel,
  ) {}

  public async getById(id: string): Promise<IUserIdentity> {
    if (!id) {
      return null;
    }

    const model = await this._userIdentityModel.findByPk(id);
    return model && UserIdentity.transform(model);
  }

  public async createIdentity(
    userId: string,
    code: string,
  ): Promise<IUserIdentity> {
    if (!userId || !code) {
      return null;
    }

    const userIdentityDomain = new UserIdentity({
      userId,
      verificationCode: code,
      isVerified: false,
    });
    await this._userIdentityModel.create(userIdentityDomain);
    return userIdentityDomain;
  }
  public async verifyIdentity(
    identityId: string,
    code: string,
  ): Promise<boolean> {
    if (!identityId || !code) {
      return false;
    }

    const model = await this._userIdentityModel.findByPk(identityId);
    const isVerified = model.verificationCode === code;

    model.isVerified = isVerified;
    await model.save();

    return isVerified;
  }
}
