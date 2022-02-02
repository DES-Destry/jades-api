import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TokenBlacklistItemModel } from './models/token-blacklist-item.model';
import { TokenBlacklistRepository } from './repositories/token-blacklist.repository';
import { TokenService } from './token.service';

@Module({
  imports: [SequelizeModule.forFeature([TokenBlacklistItemModel])],
  providers: [TokenService, TokenBlacklistRepository],
  exports: [TokenService],
})
export class TokenModule {}
