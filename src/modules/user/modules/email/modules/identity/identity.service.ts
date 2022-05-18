import { Inject, Injectable } from '@nestjs/common';
import { IUserEmailIdentity } from 'src/shared/domain/interfaces/user-email-identity.interface';
import { IUserEmail } from 'src/modules/user/modules/email/domain/email.interface';
import { EmailSender } from 'src/shared/senders/email.sender';
import { IUserEmailIdentityRepository } from './interfaces/identity-repository.interface';

@Injectable()
export class UserEmailIdentityService {
  constructor(
    @Inject('UserEmailIdentityRepository')
    private readonly _userEmailIdentityRepository: IUserEmailIdentityRepository,
    private readonly _emailSender: EmailSender,
  ) {}

  public async createIdentityOrNull(
    email: IUserEmail,
  ): Promise<IUserEmailIdentity> {
    // TODO: generate code
    const code = '';
    const emailIdentity =
      await this._userEmailIdentityRepository.createIdentity(email.id, code);

    if (emailIdentity) {
      const mailToSend = email.email;

      if (mailToSend) {
        await this._emailSender.send({
          from: '',
          to: mailToSend,
          topic: 'Verify your account on JADES!',
          message: emailIdentity.verificationCode,
        });
      }
    }

    return emailIdentity;
  }

  public async verifyIdentityOrNull(
    identityId: string,
    code: string,
  ): Promise<boolean> {
    const isVerified = await this._userEmailIdentityRepository.verifyIdentity(
      identityId,
      code,
    );

    return isVerified;
  }
}
