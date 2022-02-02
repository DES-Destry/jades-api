import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import {
  AuthorizedResponseDoc,
  AuthorizedResponseDto,
} from 'src/auth/dtos/common/auth.dto';
import { ApiServerOperation } from 'src/shared/decorators/api-server-operation.decorator';
import { CreateUserDto } from 'src/shared/dtos/create-user.dto';
import { ActionResultDto } from 'src/shared/result/dtos/action-result.dto';
import { LoginRequestDto } from './dtos/login.dto';
import { AuthEmailService } from './email.service';

@ApiTags('Auth - via Email')
@Controller('email')
export class AuthEmailController {
  constructor(private readonly _authEmailService: AuthEmailService) {}

  @ApiServerOperation(
    'Create new user.',
    'Sign up with provided parameters in request body - email, username and password.',
  )
  @ApiCreatedResponse({
    type: AuthorizedResponseDoc,
    description: 'Credentials for authorization.',
  })
  @Post('/create')
  public async createUser(
    @Body() dto: CreateUserDto,
  ): Promise<ActionResultDto<AuthorizedResponseDto>> {
    const response = await this._authEmailService.createUserByEmail(dto);
    return response;
  }

  @ApiServerOperation(
    'Login user.',
    'Sign in via user login and password. Login can be a username or one of his emails.',
  )
  @ApiCreatedResponse({
    type: AuthorizedResponseDoc,
    description: 'Credentials for authorization.',
  })
  @Post('/login')
  public async loginUser(
    @Body() dto: LoginRequestDto,
  ): Promise<ActionResultDto<AuthorizedResponseDto>> {
    const response = await this._authEmailService.loginUser(dto);
    return response;
  }
}
