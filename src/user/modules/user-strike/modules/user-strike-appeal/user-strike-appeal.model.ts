import {
  Column,
  CreatedAt,
  Default,
  DeletedAt,
  HasOne,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { v4 as uuid } from 'uuid';
import { UserStrikeAppeal } from 'src/shared/domain/user-strike-appeal';
import { UserStrikeModel } from '../../user-strike.model';

interface UserStrikeAppealModelCreationAttributes {
  appealContent: string;
}

@Table({ tableName: 'user_strike_appeals' })
export class UserStrikeAppealModel extends Model<
  UserStrikeAppeal,
  UserStrikeAppealModelCreationAttributes
> {
  @PrimaryKey
  @Default(uuid())
  @Column
  id?: string;

  @Column({ field: 'appeal_content' })
  appealContent: string;

  @HasOne(() => UserStrikeModel)
  strike: UserStrikeModel;

  @CreatedAt
  @Default(new Date())
  @Column({ field: 'created_at' })
  createdAt: Date;

  @UpdatedAt
  @Default(new Date())
  @Column({ field: 'updated_at' })
  updatedAt: Date;

  @DeletedAt
  @Default(null)
  @Column({ field: 'deleted_at' })
  deletedAt: Date;
}
