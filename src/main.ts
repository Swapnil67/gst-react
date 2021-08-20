import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule, { cors: true });
//   await app.listen(3000);
// }

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors({  // wrong!  in my case, anyway
    origin: 'http://localhost:3003',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept',
    credentials: true,
  });
  await app.listen(process.env.PORT || 3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
// https://gst-finanvo-nest-server.herokuapp.com/