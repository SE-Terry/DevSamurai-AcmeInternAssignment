import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn'],
  });
  
  // Enable CORS
  app.enableCors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        'http://localhost:5173', // Local development
        'http://localhost:3000', // Local development
        'https://dev-samurai-acme-intern-assignment.vercel.app/', // Vercel production
        'https://devsamurai-acmeinternassignment-production.up.railway.app/', // Railway production
      ];
      
      // Allow any Vercel preview deployment
      const isVercelDomain = origin && origin.includes('.vercel.app');
      
      if (!origin || allowedOrigins.includes(origin) || isVercelDomain) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });
  
  await app.listen(process.env.PORT ?? 3000);
  new Logger('Bootstrap').log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
