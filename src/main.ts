import { NestFactory } from '@nestjs/core';
import { AppModule } from './application/app.module';
import { ConfigService } from './infrastructure/config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new ConfigService();
  await app.listen(await config.getPortConfig());
}
bootstrap();
