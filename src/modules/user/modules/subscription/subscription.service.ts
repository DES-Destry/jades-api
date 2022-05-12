import { Inject, Injectable } from '@nestjs/common';
import { ActionResultDto } from 'src/shared/result/dtos/action-result.dto';
import { ResultFactory } from 'src/shared/result/result-factory';
import { ToggleSubscriptionResponseDto } from './dtos/toggle-subscription.dto';
import { IUserSubscriptionRepository } from './interfaces/subscription-repository.interface';

@Injectable()
export class UserSubscriptionService {
  constructor(
    @Inject('IUserSubscriptionRepository')
    private readonly _userSubscriptionRepository: IUserSubscriptionRepository,
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
