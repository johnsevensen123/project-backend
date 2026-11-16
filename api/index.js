process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

import 'reflect-metadata';
import 'pg';
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
    SwaggerModule.setup('api', app, document, {
      customCssUrl:
        'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.18.2/swagger-ui.min.css',
      customJs: [
        'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.18.2/swagger-ui-bundle.js',
        'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.18.2/swagger-ui-standalone-preset.js',
      ],
    });

    await app.init();
  }
  return app.getHttpAdapter().getInstance();
}

export default async function handler(req, res) {
  // Test de diagnostic immédiat
  if (req.url === '/ping' || req.url === '/api/ping') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    return res.end('pong');
  }

  try {
    // Préserver l'URL d'origine si Vercel réécrit vers /api
    if (req.url === '/api' && req.headers['x-matched-path'] && req.headers['x-matched-path'] !== '/api') {
      req.url = req.headers['x-matched-path'];
    }
    const server = await bootstrap();

    // Attendre la fin de la réponse Express avant de clore la fonction Vercel
    return new Promise((resolve, reject) => {
      res.on('finish', resolve);
      res.on('close', resolve);
      res.on('error', reject);
      server(req, res);
    });
  } catch (err) {
    console.error('SERVERLESS BOOTSTRAP ERROR:', err);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    return res.end(
      JSON.stringify({
        error: 'SERVERLESS_BOOTSTRAP_ERROR',
        message: err.message,
        stack: err.stack,
      }),
    );
  }
}
