import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  dotenv.config(); // Load environment variables from .env file
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
  );
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
    optionsSuccessStatus: 200,
    credentials: true, // If needed, set to true to allow cookies
  });

  app
    .getHttpAdapter()
    .getInstance()
    .route({
      method: 'GET',
      url: '/',
      handler: (req, res) => {
        res.send({
          status: true,
          health_check: 'healthy',
          version: 2.0,
        });
      },
    });

  app.setGlobalPrefix('v1');

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(5173, '0.0.0.0');
}
bootstrap();
