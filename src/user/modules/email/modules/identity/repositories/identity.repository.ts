import { InjectModel } from '@nestjs/sequelize';
import { IUserEmailIdentity } from 'src/shared/domain/interfaces/user-email-identity.interface';
import { UserEmailIdentity } from 'src/shared/domain/user-email-identity';
import { IUserEmailIdentityRepository } from '../interfaces/identity-repository.interface';
import { UserEmailIdentityModel } from '../identity.model';

export class UserEmailIdentityRepository
  implements IUserEmailIdentityRepository
{
  constructor(
    @InjectModel(UserEmailIdentityModel)
    private readonly _userEmailIdentityModel: typeof UserEmailIdentityModel,
  ) {}

  public async getById(id: string): Promise<IUserEmailIdentity> {
    if (!id) {
      return null;
    }

    const model = await this._userEmailIdentityModel.findByPk(id);
    return model && UserEmailIdentity.transform(model);
  }
  public async getByEmailId(emailId: string): Promise<IUserEmailIdentity> {
    if (!emailId) {
      return null;
    }

    const model = await this._userEmailIdentityModel.findOne({
      where: { emailId },
    });
    return model && UserEmailIdentity.transform(model);
  }

  public async createIdentity(
    emailId: string,
    code: string,
  ): Promise<IUserEmailIdentity> {
    if (!emailId || !code) {
      return null;
    }

    const userEmailIdentityCandidate =
      await this._userEmailIdentityModel.findOne({
        where: { emailId },
      });

    if (userEmailIdentityCandidate) {
      await userEmailIdentityCandidate.destroy();
    }

    const userIdentityDomain = new UserEmailIdentity({
      emailId,
      verificationCode: code,
      isVerified: false,
    });
    await this._userEmailIdentityModel.create(userIdentityDomain);
    return userIdentityDomain;
  }
  public async verifyIdentity(
    identityId: string,
    code: string,
  ): Promise<boolean> {
    if (!identityId || !code) {
      return false;
    }

    const model = await this._userEmailIdentityModel.findByPk(identityId);
    const isVerified = model.verificationCode === code;

    model.isVerified = isVerified;
    await model.save();

    return isVerified;
  }
}
