import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { ApiServerOperation } from 'src/infrastructure/decorators/api-server-operation.decorator';
import { Auth } from 'src/infrastructure/decorators/auth.decorator';
import { User } from 'src/infrastructure/decorators/user.decorator';
import { IUser } from 'src/modules/user/domain/user.interface';
import { ActionResultDto } from 'src/shared/result/dtos/action-result.dto';
import {
  VoidResultDoc,
  VoidResultDto,
} from 'src/shared/result/dtos/void-result.dto';
import {
  CreateUserEmailRequestDto,
  CreateUserEmailResponseDoc,
  CreateUserEmailResponseDto,
} from './dtos/create-user-email.dto';
import {
  RefreshUserEmailIdentityRequestDto,
  RefreshUserEmailIdentityResponseDoc,
  RefreshUserEmailIdentityResponseDto,
} from './dtos/refresh-user-email-identity.dto';
import { ToggleMainUserEmailRequestDto } from './dtos/toggle-main-user-email.dto';
import { ToggleVisibleUserEmailRequestDto } from './dtos/toggle-visible-user-email.dto';
import { UserEmailService } from './email.service';

@ApiTags('User - Email')
@Controller('user/email')
export class UserEmailController {
  constructor(private readonly _userEmailService: UserEmailService) {}

  @ApiServerOperation({
    summary: 'Create new email for user.',
    description:
      'Create new email for user. Automatically generates identity for ',
    validationApplied: true,
  })
  @ApiCreatedResponse({
    type: CreateUserEmailResponseDoc,
    description: 'Request body when email was created.',
  })
  @Auth()
  @Post('/')
  public async createEmail(
    @Body() dto: CreateUserEmailRequestDto,
    @User() user: IUser,
  ): Promise<ActionResultDto<CreateUserEmailResponseDto>> {
    const response = await this._userEmailService.createUserEmailOrNull(
      dto,
      user,
    );
    return response;
  }

  @ApiServerOperation({
    summary: 'Check user existence by username.',
    description: 'Used to know, user with this username already exists or not.',
    validationApplied: true,
  })
  @ApiCreatedResponse({
    type: RefreshUserEmailIdentityResponseDoc,
    description: 'Request body when email identity was refreshed.',
  })
  @Auth()
  @Post('/identity')
  public async refreshIdentity(
    @Body() dto: RefreshUserEmailIdentityRequestDto,
    @User() user: IUser,
  ): Promise<ActionResultDto<RefreshUserEmailIdentityResponseDto>> {
    const response = await this._userEmailService.refreshIdentity(dto, user);
    return response;
  }

  @ApiServerOperation({
    summary: "Toggle is main value for user's email.",
    description:
      'Makes current main email secondary and some email starts being main.',
    validationApplied: true,
  })
  @ApiCreatedResponse({
    type: VoidResultDoc,
    description: 'Request body when method was executed.',
  })
  @Auth()
  @Post('/toggle-main')
  public async toggleMain(
    @Body() dto: ToggleMainUserEmailRequestDto,
    @User() user: IUser,
  ): Promise<ActionResultDto<VoidResultDto>> {
    const response = await this._userEmailService.toggleMainEmail(dto, user);
    return response;
  }

  @ApiServerOperation({
    summary: "Toggle is visible value for user's email.",
    description: 'Hide/Show email for public.',
    validationApplied: true,
  })
  @ApiCreatedResponse({
    type: VoidResultDoc,
    description: 'Request body when method was executed.',
  })
  @Auth()
  @Post('/toggle-visible')
  public async toggleVisible(
    @Body() dto: ToggleVisibleUserEmailRequestDto,
    @User() user: IUser,
  ): Promise<ActionResultDto<VoidResultDto>> {
    const response = await this._userEmailService.toggleVisibleEmail(dto, user);
    return response;
  }
}
