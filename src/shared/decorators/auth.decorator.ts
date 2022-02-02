import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '../guards/auth.guard';
import { AuthOptionalGuard } from '../guards/auth-optional.guard';

interface IAuthOptions {
  isOptional?: boolean;
  roles?: string[];
}

export function Auth(options: IAuthOptions = { isOptional: false, roles: [] }) {
  const authGuard = options.isOptional
    ? UseGuards(AuthOptionalGuard)
    : UseGuards(AuthGuard);

  return applyDecorators(ApiBearerAuth('jwt-token'), authGuard);
}
