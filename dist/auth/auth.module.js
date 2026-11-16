var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module.js';
import { AuthService } from './auth.service.js';
import { AuthController } from './auth.controller.js';
import { JwtAuthGuard } from './guards/jwt-auth.guard.js';
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    Module({
        imports: [
            UsersModule,
            JwtModule.registerAsync({
                inject: [ConfigService],
                useFactory: (config) => ({
                    secret: config.get('JWT_SECRET') ||
                        process.env.JWT_SECRET ||
                        'e6cd24eb24cbdbe5e4b519a9c71d19cba299f041a88226ff00eca9c6961ce323d5d0aaef3c78a6e000d88cd1f9618e61',
                    signOptions: {
                        expiresIn: '1d',
                    },
                }),
            }),
        ],
        providers: [AuthService, JwtAuthGuard],
        exports: [AuthService, JwtModule, JwtAuthGuard],
        controllers: [AuthController],
    })
], AuthModule);
export { AuthModule };
//# sourceMappingURL=auth.module.js.map