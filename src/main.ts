import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BetaKeyGuard } from './shared/guards/beta-key.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('/api');
  app.useGlobalGuards(new BetaKeyGuard());

  await app.listen(3000);
}
bootstrap();
