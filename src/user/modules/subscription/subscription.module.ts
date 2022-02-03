import { forwardRef, Module } from '@nestjs/common';
import { UserSubscriptionService } from './subscription.service';
import { UserSubscriptionController } from './subscription.controller';
import { UserSubscriptionRepository } from './repositories/subscription.repository';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserSubscriptionModel } from './subscription.model';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    SequelizeModule.forFeature([UserSubscriptionModel]),
    forwardRef(() => UserModule),
  ],
  providers: [UserSubscriptionService, UserSubscriptionRepository],
  controllers: [UserSubscriptionController],
})
export class UserSubscriptionModule {}
