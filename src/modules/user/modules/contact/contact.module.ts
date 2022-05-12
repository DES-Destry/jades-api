import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserContactEntity } from './contact.entity';
import { UserContactService } from './contact.service';
import { UserContactRepository } from './repositories/contact.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserContactEntity])],
  providers: [
    UserContactService,
    {
      provide: 'IUserContactRepository',
      useClass: UserContactRepository,
    },
  ],
})
export class UserContactModule {}
