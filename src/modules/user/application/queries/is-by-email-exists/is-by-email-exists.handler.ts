import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserService } from 'src/modules/user/infrastructure/user.service';
import { ActionResultDto } from 'src/shared/result/dtos/action-result.dto';
import { ResultFactory } from 'src/shared/result/result-factory';
import { UserExistsResponseDto } from '../../dtos/user-exists.dto';
import { IsByEmailExistsQuery } from './is-by-email-exists.query';

@QueryHandler(IsByEmailExistsQuery)
export class IsByEmailExistsQueryHandler
  implements IQueryHandler<IsByEmailExistsQuery>
{
  constructor(private readonly _userService: UserService) {}

  public async execute(
    query: IsByEmailExistsQuery,
  ): Promise<ActionResultDto<UserExistsResponseDto>> {
    const user = await this._userService.getByEmailOrNull(query.email);
    return ResultFactory.ok({ exists: Boolean(user) });
  }
}
