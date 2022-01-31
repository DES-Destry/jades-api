import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AppConfig } from './shared/config/app.config';
import { GlobalExceptionFilter } from './shared/filters/global-exception.filter';
import { BetaKeyGuard } from './shared/guards/beta-key.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('/api');
  app.useGlobalGuards(new BetaKeyGuard());
  app.useGlobalFilters(new GlobalExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle('Unimaster Blog API')
    .setDescription(
      'Description of the Unimaster Blog API. This API can be used by everyone, but main API user - Unimaster Blog Website',
    )
    .setVersion('0.0.1')
    .addTag('Unimaster Blog')
    .setLicense('GPL 3.0 License', 'unavailable')
    .setTermsOfService('Test terms of service')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  await app.listen(AppConfig.Port);
}
bootstrap();
