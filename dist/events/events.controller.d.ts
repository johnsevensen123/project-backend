import type { Request } from 'express';
import { EventsService } from './events.service.js';
import { CreateEventDto } from './dto/create-event.dto.js';
import { UpdateEventDto } from './dto/update-event.dto.js';
export declare class EventsController {
    private readonly eventsService;
    constructor(eventsService: EventsService);
    create(createEventDto: CreateEventDto, request: Request & {
        user: {
            sub: string;
        };
    }): Promise<import("./event.entity.js").Event>;
    findAll(request: Request & {
        user: {
            sub: string;
        };
    }): Promise<import("./event.entity.js").Event[]>;
    findOne(id: string, request: Request & {
        user: {
            sub: string;
        };
    }): Promise<import("./event.entity.js").Event>;
    update(id: string, updateEventDto: UpdateEventDto, request: Request & {
        user: {
            sub: string;
        };
    }): Promise<import("./event.entity.js").Event>;
    remove(id: string, request: Request & {
        user: {
            sub: string;
        };
    }): Promise<{
        message: string;
    }>;
}
