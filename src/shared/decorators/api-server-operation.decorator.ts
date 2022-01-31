import { applyDecorators } from '@nestjs/common';
import { ApiInternalServerErrorResponse, ApiOperation } from '@nestjs/swagger';
import { AppConfig } from '../config/app.config';
import { ErrorDataDoc } from '../result/dtos/error-data.doc';

export function ApiServerOperation(
  summary: string,
  description = '',
  deprecated = false,
) {
  return applyDecorators(
    ApiOperation({ summary, description, deprecated }),
    ApiInternalServerErrorResponse({
      type: ErrorDataDoc,
      description: AppConfig.Swagger500Description,
    }),
  );
}
