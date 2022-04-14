import { IUserContact } from 'src/shared/domain/interfaces/user-contact.interface';
import { DateAudit } from 'src/shared/entities/date-audit';
import { UserEntity } from 'src/user/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity('user_contacts')
export class UserContactEntity extends DateAudit implements IUserContact {
  @Column('varchar', { name: 'user_id' })
  userId: string;

  @ManyToOne(() => UserEntity, (entity) => entity.contacts)
  user?: UserEntity;

  @Column('varchar')
  title: string;

  @Column('varchar', { nullable: true })
  description?: string;

  @Column('varchar', { name: 'media_type' })
  mediaType: string;

  @Column('varchar')
  link: string;
}
