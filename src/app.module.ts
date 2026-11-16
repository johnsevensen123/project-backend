process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

import 'reflect-metadata';
import 'pg';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { UsersModule } from './users/users.module.js';
import { AuthModule } from './auth/auth.module.js';
import { EventsModule } from './events/events.module.js';
import { RegistrationsModule } from './registrations/registrations.module.js';

@Module({
  
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const url = config.get<string>('DATABASE_URL');
        if (!url) {
          console.error('❌ ERREUR: DATABASE_URL est absente des variables d environnement Vercel !');
        } else {
          console.log('✅ DATABASE_URL détectée:', url.replace(/:[^:@]+@/, ':***@'));
        }
        return {
          type: 'postgres',
          url,
          ssl: { rejectUnauthorized: false },
          extra: {
            ssl: {
              rejectUnauthorized: false,
            },
          },
          autoLoadEntities: true,
          synchronize: false,
        };
      },
    }),
         UsersModule,
      AuthModule,
      EventsModule,
      RegistrationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}