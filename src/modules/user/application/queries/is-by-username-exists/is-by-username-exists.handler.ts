import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserService } from 'src/modules/user/infrastructure/user.service';
import { ActionResultDto } from 'src/shared/result/dtos/action-result.dto';
import { ResultFactory } from 'src/shared/result/result-factory';
import { UserExistsResponseDto } from '../../dtos/user-exists.dto';
import { IsByUsernameExistsQuery } from './is-by-username-exists.query';

@QueryHandler(IsByUsernameExistsQuery)
export class IsByUsernameExistsQueryHandler
  implements IQueryHandler<IsByUsernameExistsQuery>
{
  constructor(private readonly _userService: UserService) {}

  public async execute(
    query: IsByUsernameExistsQuery,
  ): Promise<ActionResultDto<UserExistsResponseDto>> {
    const user = await this._userService.getByEmailOrNull(query.username);
    return ResultFactory.ok({ exists: Boolean(user) });
  }
}
