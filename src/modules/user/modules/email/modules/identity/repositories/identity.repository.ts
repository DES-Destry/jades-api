import { IUserEmailIdentity } from 'src/shared/domain/interfaces/user-email-identity.interface';
import { UserEmailIdentity } from 'src/shared/domain/user-email-identity';
import { IUserEmailIdentityRepository } from '../interfaces/identity-repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEmailIdentityEntity } from '../identity.entity';
import { Repository } from 'typeorm';

export class UserEmailIdentityRepository
  implements IUserEmailIdentityRepository
{
  constructor(
    @InjectRepository(UserEmailIdentityEntity)
    private readonly _userEmailIdentityEntity: Repository<UserEmailIdentityEntity>,
  ) {}

  public async getById(id: string): Promise<IUserEmailIdentity> {
    if (!id) {
      return null;
    }

    const entity = await this._userEmailIdentityEntity.findOne(id);
    return entity && UserEmailIdentity.transform(entity);
  }
  public async getByEmailId(emailId: string): Promise<IUserEmailIdentity> {
    if (!emailId) {
      return null;
    }

    const entity = await this._userEmailIdentityEntity.findOne({
      where: { emailId },
    });
    return entity && UserEmailIdentity.transform(entity);
  }

  public async createIdentity(
    emailId: string,
    code: string,
  ): Promise<IUserEmailIdentity> {
    if (!emailId || !code) {
      return null;
    }

    const userEmailIdentityCandidate =
      await this._userEmailIdentityEntity.findOne({
        where: { emailId },
      });

    if (userEmailIdentityCandidate) {
      await this._userEmailIdentityEntity.delete(userEmailIdentityCandidate);
    }

    const userIdentityDomain = new UserEmailIdentity({
      emailId,
      verificationCode: code,
      isVerified: false,
    });
    const entity = this._userEmailIdentityEntity.create(userIdentityDomain);
    await entity.save();

    return userIdentityDomain;
  }
  public async verifyIdentity(
    identityId: string,
    code: string,
  ): Promise<boolean> {
    if (!identityId || !code) {
      return false;
    }

    const entity = await this._userEmailIdentityEntity.findOne(identityId);
    const isVerified = entity.verificationCode === code;

    entity.isVerified = isVerified;
    await entity.save();

    return isVerified;
  }
}
