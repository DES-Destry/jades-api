import { Inject, Injectable } from '@nestjs/common';
import { IUserEmail } from 'src/shared/domain/interfaces/user-email.interface';
import { IUser } from 'src/modules/user/domain/user.interface';
import { ActionResultDto } from 'src/shared/result/dtos/action-result.dto';
import { VoidResultDto } from 'src/shared/result/dtos/void-result.dto';
import { ResultFactory } from 'src/shared/result/result-factory';
import {
  CreateUserEmailRequestDto,
  CreateUserEmailResponseDto,
} from './dtos/create-user-email.dto';
import {
  DeleteUserEmailRequestDto,
  DeleteUserEmailResponseDto,
} from './dtos/delete-user-email.dto';
import {
  RefreshUserEmailIdentityRequestDto,
  RefreshUserEmailIdentityResponseDto,
} from './dtos/refresh-user-email-identity.dto';
import { ToggleMainUserEmailRequestDto } from './dtos/toggle-main-user-email.dto';
import { ToggleVisibleUserEmailRequestDto } from './dtos/toggle-visible-user-email.dto';
import { IUserEmailRepository } from './interfaces/email-repository.interface';
import { UserEmailIdentityService } from './modules/identity/identity.service';

@Injectable()
export class UserEmailService {
  constructor(
    @Inject('IUserEmailRepository')
    private readonly _userEmailRepository: IUserEmailRepository,
    private readonly _userEmailIdentityService: UserEmailIdentityService,
  ) {}

  public async getByIdOrNull(emailId: string): Promise<IUserEmail> {
    const email = await this._userEmailRepository.getById(emailId);
    return email;
  }

  public async createUserEmailOrNull(
    dto: CreateUserEmailRequestDto,
    user: IUser,
  ): Promise<ActionResultDto<CreateUserEmailResponseDto>> {
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

    const identity = await this._userEmailIdentityService.createIdentityOrNull(
      userEmail,
    );

    return ResultFactory.ok({
      emailId: userEmail.id,
      emailIdentityId: identity.id,
    });
  }

  public async refreshIdentity(
    dto: RefreshUserEmailIdentityRequestDto,
    user: IUser,
  ): Promise<ActionResultDto<RefreshUserEmailIdentityResponseDto>> {
    const userEmail = await this.getEmailForUser(dto.emailId, user.id);

    const identity = await this._userEmailIdentityService.createIdentityOrNull(
      userEmail,
    );

    return ResultFactory.ok({
      identityId: identity.id,
    });
  }

  public async toggleMainEmail(
    dto: ToggleMainUserEmailRequestDto,
    user: IUser,
  ): Promise<ActionResultDto<VoidResultDto>> {
    await this.getEmailForUser(dto.emailId, user.id);
    await this._userEmailRepository.toggleMain(dto.emailId);

    return ResultFactory.ok({ executed: true });
  }

  public async toggleVisibleEmail(
    dto: ToggleVisibleUserEmailRequestDto,
    user: IUser,
  ): Promise<ActionResultDto<VoidResultDto>> {
    await this.getEmailForUser(dto.emailId, user.id);
    await this._userEmailRepository.toggleVisible(dto.emailId);

    return ResultFactory.ok({ executed: true });
  }

  public async deleteEmail(
    dto: DeleteUserEmailRequestDto,
    user: IUser,
  ): Promise<ActionResultDto<DeleteUserEmailResponseDto>> {
    await this.getEmailForUser(dto.emailId, user.id);

    const isDeleted = await this._userEmailRepository.deleteEmail(dto.emailId);
    return ResultFactory.ok({ isDeleted });
  }

  private async getEmailForUser(
    emailId: string,
    userId: string,
  ): Promise<IUserEmail> {
    const userEmail = await this._userEmailRepository.getById(emailId);

    if (!userEmail) {
      ResultFactory.notFound('Email with this email not found');
    }

    if (userEmail.userId !== userId) {
      ResultFactory.forbidden('You are not a owner of this email');
    }

    return userEmail;
  }
}
