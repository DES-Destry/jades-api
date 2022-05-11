import { InjectRepository } from '@nestjs/typeorm';
import { IUserStrike } from 'src/shared/domain/interfaces/user-strike.interface';
import { UserStrike } from 'src/shared/domain/user-strike';
import { Repository } from 'typeorm';
import { IUserStrikeRepository } from '../interfaces/strike-repository.interface';
import { UserStrikeEntity } from '../strike.entity';

export class UserStrikeRepository implements IUserStrikeRepository {
  constructor(
    @InjectRepository(UserStrikeEntity)
    private readonly _userStrikeEntity: Repository<UserStrikeEntity>,
  ) {}

  public async getById(id: string): Promise<IUserStrike> {
    if (!id) {
      return null;
    }

    const entity = await this._userStrikeEntity.findOne(id);
    return entity && UserStrike.transform(entity);
  }

  public async createUserStrike(props: IUserStrike): Promise<IUserStrike> {
    if (!props) {
      return null;
    }

    const userStrikeDomain = UserStrike.create(props);
    const createdEntity = this._userStrikeEntity.create(userStrikeDomain);
    await createdEntity.save();
    return userStrikeDomain;
  }

  public async deleteUserStrike(strikeId: string): Promise<boolean> {
    if (!strikeId) {
      return false;
    }

    // TODO: check that entry not deleted and deletedAt value just was set
    const deleteResult = await this._userStrikeEntity.delete({ id: strikeId });
    return deleteResult.affected > 0;
  }
}
