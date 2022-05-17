import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AuthGuard } from '../guards/auth.guard';
import { AuthOptionalGuard } from '../guards/auth-optional.guard';
import { ErrorDataDoc } from '../../shared/result/dtos/error-data.doc';

interface IAuthOptions {
  isOptional?: boolean;
  roles?: string[];
}

export function Auth(options: IAuthOptions = { isOptional: false, roles: [] }) {
  const errorDocumentations = [];
  const authGuard = options.isOptional
    ? UseGuards(AuthOptionalGuard)
    : UseGuards(AuthGuard);

  if (!options.isOptional) {
    errorDocumentations.push(
      ApiUnauthorizedResponse({
        type: ErrorDataDoc,
        description: 'If token is not provided or it is not correct.',
      }),
    );
  }

  return applyDecorators(
    ApiBearerAuth('jwt-token'),
    authGuard,
    ...errorDocumentations,
  );
}
