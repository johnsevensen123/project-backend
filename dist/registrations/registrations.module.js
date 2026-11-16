var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Registration } from './registration.entity.js';
import { Event } from '../events/event.entity.js';
import { RegistrationsService } from './registrations.service.js';
import { RegistrationsController } from './registrations.controller.js';
import { AuthModule } from '../auth/auth.module.js';
let RegistrationsModule = class RegistrationsModule {
};
RegistrationsModule = __decorate([
    Module({
        imports: [
            TypeOrmModule.forFeature([Registration, Event]),
            AuthModule,
        ],
        controllers: [RegistrationsController],
        providers: [RegistrationsService],
    })
], RegistrationsModule);
export { RegistrationsModule };
//# sourceMappingURL=registrations.module.js.map