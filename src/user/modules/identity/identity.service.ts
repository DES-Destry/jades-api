import { Injectable } from '@nestjs/common';
import { IUserIdentity } from 'src/shared/domain/interfaces/user-identity.interface';
import { User } from 'src/shared/domain/user';
import { EmailSender } from 'src/shared/senders/email.sender';
import { UserService } from 'src/user/user.service';
import { UserIdentityRepository } from './repositories/identity.repository';

@Injectable()
export class UserIdentityService {
  constructor(
    private readonly _userIdentityRepository: UserIdentityRepository,
    private readonly _userService: UserService,
    private readonly _emailSender: EmailSender,
  ) {}

  public async createIdentityOrNull(
    userId: string,
    code: string,
  ): Promise<IUserIdentity> {
    const userIdentity = await this._userIdentityRepository.createIdentity(
      userId,
      code,
    );

    if (userIdentity) {
      const mainMail = User.transform(userIdentity.user).getPrimaryMail();
      await this._emailSender.send({
        from: '',
        to: mainMail,
        topic: 'Verify your Unimaster Blog account!',
        message: userIdentity.verificationCode,
      });
    }

    return userIdentity;
  }

  public async verifyIdentityOrNull(
    identityId: string,
    code: string,
  ): Promise<boolean> {
    const isVerified = await this._userIdentityRepository.verifyIdentity(
      identityId,
      code,
    );

    // Set is verified for user
    if (isVerified) {
      const identity = await this._userIdentityRepository.getById(identityId);
      if (identity) {
        await this._userService.verify(identity.userId);
      }
    }

    return isVerified;
  }
}
