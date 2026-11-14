import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from '../dist/app.module.js';

let app;

async function bootstrap() {
  if (!app) {
    app = await NestFactory.create(AppModule);

    app.enableCors();

    // Protection des en-têtes HTTP
    app.use(
      helmet({
        contentSecurityPolicy: false,
      }),
    );

    // Validation globale des données entrantes
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );

    // Configuration de Swagger
    const config = new DocumentBuilder()
      .setTitle('API de gestion des événements')
      .setDescription(
        'API REST pour la gestion des utilisateurs, événements et inscriptions.',
      )
      .setVersion('1.0')
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    await app.init();
  }
  return app.getHttpAdapter().getInstance();
}

export default async function handler(req, res) {
  // Préserver l'URL d'origine si Vercel réécrit vers /api
  if (req.url === '/api' && req.headers['x-matched-path'] && req.headers['x-matched-path'] !== '/api') {
    req.url = req.headers['x-matched-path'];
  }
  const server = await bootstrap();
  return server(req, res);
}
