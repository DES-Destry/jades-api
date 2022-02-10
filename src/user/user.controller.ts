import { Controller, Get, Param } from '@nestjs/common';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { ApiServerOperation } from 'src/shared/decorators/api-server-operation.decorator';
import { ActionResultDto } from 'src/shared/result/dtos/action-result.dto';
import { ResultFactory } from 'src/shared/result/result-factory';
import {
  UserExistsResponseDoc,
  UserExistsResponseDto,
} from './dtos/user-exists.dto';
import { UserService } from './user.service';

@ApiTags('User controller')
@Controller('user')
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @ApiServerOperation({
    summary: 'Check user existence by username.',
    description: 'Used to know, user with this username already exists or not.',
  })
  @ApiOkResponse({
    type: UserExistsResponseDoc,
    description: 'User with this username found or not successfully.',
  })
  @ApiParam({
    name: 'username',
    description: 'Username by which will finding already existed users.',
  })
  @Get('/username/:username/exists')
  public async isByUsernameExists(
    @Param('username') username: string,
  ): Promise<ActionResultDto<UserExistsResponseDto>> {
    const user = await this._userService.getByUsernameOrNull(username);
    return ResultFactory.ok({
      exists: Boolean(user),
    });
  }

  @ApiServerOperation({
    summary: 'Check user existence by email.',
    description: 'Used to know, user with this email already exists or not.',
  })
  @ApiOkResponse({
    type: UserExistsResponseDoc,
    description: 'User with this email found or not successfully.',
  })
  @ApiParam({
    name: 'email',
    description: 'Email by which will finding already existed users.',
  })
  @Get('/email/:email/exists')
  public async isByEmailExists(
    @Param('email') email: string,
  ): Promise<ActionResultDto<UserExistsResponseDto>> {
    const user = await this._userService.getByEmailOrNull(email);
    return ResultFactory.ok({
      exists: Boolean(user),
    });
  }
}
