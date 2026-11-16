import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module.js';
import * as helmetNs from 'helmet';

// Compatible CommonJS et ESM : récupère la vraie fonction helmet
const helmet: (options?: any) => any = (helmetNs as any).default ?? (helmetNs as any);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Activation de CORS
  app.enableCors();

  // Protection des en-têtes HTTP avec Helmet (CSP désactivé pour Swagger UI)
  app.use(helmet({ contentSecurityPolicy: false }));

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

  const port = process.env.PORT ?? 3000;
  await app.listen(port, '0.0.0.0');
  console.log(`🚀 Application prête et à l'écoute sur le port ${port}`);
}

void bootstrap();