import type { Request } from 'express';
import { RegistrationsService } from './registrations.service.js';
export declare class RegistrationsController {
    private readonly registrationsService;
    constructor(registrationsService: RegistrationsService);
    register(eventId: string, request: Request & {
        user: {
            sub: string;
        };
    }): Promise<import("./registration.entity.js").Registration>;
    findAll(request: Request & {
        user: {
            sub: string;
        };
    }): Promise<import("./registration.entity.js").Registration[]>;
    cancel(id: string, request: Request & {
        user: {
            sub: string;
        };
    }): Promise<{
        message: string;
    }>;
}
