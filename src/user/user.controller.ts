import { Controller, Get, Param } from '@nestjs/common';
import { ActionResultDto } from 'src/shared/result/dtos/action-result.dto';
import { ResultFactory } from 'src/shared/result/result-factory';
import { UserExistsResponseDto } from './dtos/user-exists.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @Get('/username/:username/exists')
  public async byUsernameExists(
    @Param('username') username: string,
  ): Promise<ActionResultDto<UserExistsResponseDto>> {
    const user = await this._userService.getByUsername(username);
    return ResultFactory.ok({
      exists: Boolean(user),
    });
  }

  // TODO: byEmailExists
}
