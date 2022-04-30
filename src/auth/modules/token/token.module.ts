import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenBlacklistItemEntity } from './entities/token-blacklist-item.entity';
import { TokenBlacklistRepository } from './repositories/token-blacklist.repository';
import { AuthTokenService } from './token.service';

@Module({
  imports: [TypeOrmModule.forFeature([TokenBlacklistItemEntity])],
  providers: [AuthTokenService, TokenBlacklistRepository],
  exports: [AuthTokenService],
})
export class AuthTokenModule {}
