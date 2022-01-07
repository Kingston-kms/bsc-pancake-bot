import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ServerService } from './server/server.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const server = app.get(ServerService);
  server.start();
  await app.listen(3000);
}
bootstrap();
