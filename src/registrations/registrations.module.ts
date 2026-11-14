import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Registration } from './registration.entity.js';
import { Event } from '../events/event.entity.js';
import { RegistrationsService } from './registrations.service.js';
import { RegistrationsController } from './registrations.controller.js';
import { AuthModule } from '../auth/auth.module.js';

@Module({
 imports: [
  TypeOrmModule.forFeature([Registration, Event]),
  AuthModule,
],
  controllers: [RegistrationsController],
  providers: [RegistrationsService],
})
export class RegistrationsModule {}