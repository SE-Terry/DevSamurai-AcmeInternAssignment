import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn'],
  });
  
  // Enable CORS
  app.enableCors({
    origin: [
      'http://localhost:5173', // Local development
      'http://localhost:3000', // Local development
      'https://dev-samurai-acme-intern-assignment.vercel.app/', // Vercel production
      'https://*.vercel.app', // All Vercel preview deployments
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });
  
  await app.listen(process.env.PORT ?? 3000);
  new Logger('Bootstrap').log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
