import { Injectable } from '@nestjs/common';
import { IUserEmail } from 'src/shared/domain/interfaces/user-email.interface';
import { IUser } from 'src/shared/domain/interfaces/user.interface';
import { ActionResultDto } from 'src/shared/result/dtos/action-result.dto';
import { ResultFactory } from 'src/shared/result/result-factory';
import { CreateUserEmailDto } from './dtos/create-user-email.dto';
import { UserEmailIdentityService } from './modules/identity/identity.service';
import { UserEmailRepository } from './repository/email.repository';

@Injectable()
export class UserEmailService {
  constructor(
    private readonly _userEmailRepository: UserEmailRepository,
    private readonly _userEmailIdentityService: UserEmailIdentityService,
  ) {}

  public async getByIdOrNull(emailId: string): Promise<IUserEmail> {
    const email = await this._userEmailRepository.getById(emailId);
    return email;
  }

  public async createUserEmailOrNull(
    dto: CreateUserEmailDto,
    user: IUser,
  ): Promise<ActionResultDto<IUserEmail>> {
    const userEmail = await this._userEmailRepository.create({
      userId: user.id,
      ...dto,
    });

    if (!userEmail) {
      ResultFactory.badRequest('Not correct dto was provided', [
        'Request body must be not null',
      ]);
    }

    await this._userEmailIdentityService.createIdentityOrNull(userEmail);

    return ResultFactory.ok(userEmail);
  }
}
