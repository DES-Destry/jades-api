import { IUserContact } from 'src/shared/domain/interfaces/user-contact.interface';
import { IUser } from 'src/shared/domain/interfaces/user.interface';
import { DateAudit } from 'src/shared/entities/date-audit';
import { Column, Entity } from 'typeorm';

@Entity('user_contacts')
export class UserContactEntity extends DateAudit implements IUserContact {
  @Column('varchar', { name: 'user_id' })
  userId: string;
  user?: IUser; // TODO UserEntity

  @Column('varchar')
  title: string;

  @Column('varchar', { nullable: true })
  description?: string;

  @Column('varchar', { name: 'media_type' })
  mediaType: string;

  @Column('varchar')
  link: string;
}
