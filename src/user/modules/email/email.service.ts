import { Injectable } from '@nestjs/common';
import { IUserEmail } from 'src/shared/domain/interfaces/user-email.interface';
import { IUser } from 'src/shared/domain/interfaces/user.interface';
import { ActionResultDto } from 'src/shared/result/dtos/action-result.dto';
import { ResultFactory } from 'src/shared/result/result-factory';
import { CreateUserEmailRequestDto } from './dtos/create-user-email.dto';
import {
  RefreshIdentityRequestDto,
  RefreshIdentityResponseDto,
} from './dtos/refresh-identity.dto';
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
    dto: CreateUserEmailRequestDto,
    user: IUser,
  ): Promise<ActionResultDto<IUserEmail>> {
    const userEmail = await this._userEmailRepository.create({
      userId: user.id,
      ...dto,
      // If isMain will set there as true - user will have 2 main emails. It must toggle main mail later.
      isMain: false,
    });

    if (!userEmail) {
      ResultFactory.badRequest('Not correct dto was provided', [
        'Request body must be not null',
      ]);
    }

    if (dto.isMain) {
      await this._userEmailRepository.toggleMain(userEmail.id);
    }

    await this._userEmailIdentityService.createIdentityOrNull(userEmail);

    return ResultFactory.ok(userEmail);
  }

  public async refreshIdentity(
    dto: RefreshIdentityRequestDto,
    user: IUser,
  ): Promise<ActionResultDto<RefreshIdentityResponseDto>> {
    const userEmail = await this._userEmailRepository.getById(dto.emailId);

    if (!userEmail) {
      ResultFactory.notFound('Email with this email not found');
    }

    if (userEmail.userId !== user.id) {
      ResultFactory.forbidden('You are not a owner of this email');
    }

    const identity = await this._userEmailIdentityService.createIdentityOrNull(
      userEmail,
    );

    return ResultFactory.ok({
      identityId: identity.id,
    });
  }
}
