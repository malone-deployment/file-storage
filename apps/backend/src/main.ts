import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
const HOST = '0.0.0.0';
const PORT = Number(process.env.PORT) || 8080;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(PORT, HOST).then(() => {
    Logger.log(
      `** Nest Live Development Server is listening on ${HOST}:${PORT}, open your browser on http://localhost:${PORT}/ **`
    );
  });
}
bootstrap();
