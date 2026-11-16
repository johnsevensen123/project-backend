var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
let AppModule = class AppModule {
};
AppModule = __decorate([
    Module({
        imports: [
            ConfigModule.forRoot({ isGlobal: true }),
            TypeOrmModule.forRootAsync({
                inject: [ConfigService],
                useFactory: (config) => {
                    const fallbackUrl = 'postgresql://postgres.xfpojrszendqtjwsfype:33153926440%40@aws-0-eu-north-1.pooler.supabase.com:5432/postgres';
                    const url = config.get('DATABASE_URL') || process.env.DATABASE_URL || fallbackUrl;
                    console.log('✅ DATABASE_URL utilisée:', url.replace(/:[^:@]+@/, ':***@'));
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
                        retryAttempts: 1,
                        retryDelay: 1000,
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
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map