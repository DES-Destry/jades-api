import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TokenBlacklistItemModel } from './models/token-blacklist-item.model';
import { TokenBlacklistRepository } from './repositories/token-blacklist.repository';
import { AuthTokenService } from './token.service';

@Module({
  imports: [SequelizeModule.forFeature([TokenBlacklistItemModel])],
  providers: [AuthTokenService, TokenBlacklistRepository],
  exports: [AuthTokenService],
})
export class AuthTokenModule {}
