import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ServerService } from './server/server.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const server = app.get(ServerService);
  await server.load();
  //await app.listen(3000);
}
bootstrap();
