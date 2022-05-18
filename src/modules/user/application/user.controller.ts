import { Controller, Get, Param } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { ApiServerOperation } from 'src/infrastructure/decorators/api-server-operation.decorator';
import { ActionResultDto } from 'src/shared/result/dtos/action-result.dto';
import {
  UserExistsResponseDoc,
  UserExistsResponseDto,
} from './dtos/user-exists.dto';
import { IsByEmailExistsQuery } from './queries/is-by-email-exists/is-by-email-exists.query';
import { IsByUsernameExistsQuery } from './queries/is-by-username-exists/is-by-username-exists.query';

@ApiTags('User - Main')
@Controller('user')
export class UserController {
  constructor(private readonly _queryBus: QueryBus) {}

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
    return this._queryBus.execute(new IsByUsernameExistsQuery(username));
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
    return this._queryBus.execute(new IsByEmailExistsQuery(email));
  }
}
