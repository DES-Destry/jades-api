import { Injectable } from '@nestjs/common';
import { ActionResultDto } from 'src/shared/result/dtos/action-result.dto';
import { ResultFactory } from 'src/shared/result/result-factory';
import { ToggleSubscriptionResponseDto } from './dtos/toggle-subscription.dto';
import { UserSubscriptionRepository } from './repositories/subscription.repository';

@Injectable()
export class UserSubscriptionService {
  constructor(
    private readonly _userSubscriptionRepository: UserSubscriptionRepository,
  ) {}

  public async toggleSubscribe(
    subscriberId: string,
    writerId: string,
  ): Promise<ActionResultDto<ToggleSubscriptionResponseDto>> {
    const isSubscribed =
      await this._userSubscriptionRepository.toggleSubscription(
        subscriberId,
        writerId,
      );
    return ResultFactory.ok({ isSubscribed });
  }
}
