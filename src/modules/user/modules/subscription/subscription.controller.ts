import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { ApiServerOperation } from 'src/infrastructure/decorators/api-server-operation.decorator';
import { Auth } from 'src/infrastructure/decorators/auth.decorator';
import { User } from 'src/infrastructure/decorators/user.decorator';
import { IUser } from 'src/modules/user/domain/user.interface';
import { ActionResultDto } from 'src/shared/result/dtos/action-result.dto';
import {
  ToggleSubscriptionRequestDto,
  ToggleSubscriptionResponseDoc,
  ToggleSubscriptionResponseDto,
} from './dtos/toggle-subscription.dto';
import { UserSubscriptionService } from './subscription.service';

@ApiTags('User - Subscriptions')
@Controller('user/subscription')
export class UserSubscriptionController {
  constructor(
    private readonly _userSubscriptionService: UserSubscriptionService,
  ) {}

  @ApiServerOperation({
    summary: 'Toggle subscription.',
    description:
      'Subscribe to writer with authorized user. If current user already subscribed on this writer - delete subscription.',
    validationApplied: true,
  })
  @ApiCreatedResponse({
    type: ToggleSubscriptionResponseDoc,
    description: 'Shows subscribing was created or removed.',
  })
  @Auth()
  @Post('/toggle')
  public async toggleSubscription(
    @Body() dto: ToggleSubscriptionRequestDto,
    @User() user: IUser,
  ): Promise<ActionResultDto<ToggleSubscriptionResponseDto>> {
    const response = await this._userSubscriptionService.toggleSubscribe(
      user?.id,
      dto.writerId,
    );
    return response;
  }
}
