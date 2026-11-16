import type { Request } from 'express';
import { AuthService } from './auth.service.js';
import { RegisterDto } from './dto/register.dto.js';
import { LoginDto } from './dto/login.dto.js';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(registerDto: RegisterDto): Promise<{
        id: string;
        email: string;
        name: string;
        events: import("typeorm").Relation<import("../events/event.entity.js").Event[]>;
        registrations: import("typeorm").Relation<import("../registrations/registration.entity.js").Registration[]>;
    }>;
    login(loginDto: LoginDto): Promise<{
        access_token: string;
    }>;
    getProfile(request: Request & {
        user: any;
    }): any;
}
