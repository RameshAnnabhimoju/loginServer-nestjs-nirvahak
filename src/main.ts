import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    await app.listen(3000, () => {
      Logger.log("Server running at port 3000")
    });
  } catch (error) {
    console.log(error)
  }
}
bootstrap();
