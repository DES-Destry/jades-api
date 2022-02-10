import { applyDecorators, Version } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiHeader,
  ApiInternalServerErrorResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { AppConfig } from '../config/app.config';
import { ErrorDataDoc } from '../result/dtos/error-data.doc';

interface IApiServerOperationSettings {
  summary: string;
  description?: string;
  deprecated?: boolean;
  validationApplied?: boolean;
  version?: string;
}

export function ApiServerOperation(settings: IApiServerOperationSettings) {
  // Always apply 500 error code documentation for all of endpoints
  const errorDecorators = [
    ApiInternalServerErrorResponse({
      type: ErrorDataDoc,
      description: AppConfig.Swagger500Description,
    }),
  ];

  // If endpoint can validate request - add 400 error code documentation
  if (settings.validationApplied) {
    errorDecorators.push(
      ApiBadRequestResponse({
        type: ErrorDataDoc,
        description:
          'Input data in request body, query or params was provided incorrect',
      }),
    );
  }

  return applyDecorators(
    ...errorDecorators,
    ApiOperation(settings),
    ApiHeader({
      name: 'Beta-Key',
      description:
        "USE ONLY IF YOU VISIT A DEVELOPMENT SERVER! If you don't know a beta key, you cannot have an access for development server anyway. This header don't need when requests send to production server.",
      required: false,
      example: '49e6df5c02ba95f1284fe3b9d7480db1',
    }),
    Version(settings?.version || '0'),
  );
}
