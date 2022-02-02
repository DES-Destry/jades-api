import { applyDecorators } from '@nestjs/common';
import {
  ApiHeader,
  ApiInternalServerErrorResponse,
  ApiOperation,
} from '@nestjs/swagger';
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
    ApiHeader({
      name: 'Beta-Key',
      description:
        "USED ONLY IF YOU VISIT A DEVELOPMENT SERVER! If you don't know a beta key, you cannot have an access for development server anyway. This header don't need when requests send to production server.",
      required: false,
      example: '49e6df5c02ba95f1284fe3b9d7480db1',
    }),
  );
}
