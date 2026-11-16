import { Repository } from 'typeorm';
import { Registration } from './registration.entity.js';
import { Event } from '../events/event.entity.js';
export declare class RegistrationsService {
    private readonly registrationRepository;
    private readonly eventRepository;
    constructor(registrationRepository: Repository<Registration>, eventRepository: Repository<Event>);
    register(eventId: string, userId: string): Promise<Registration>;
    findAll(userId: string): Promise<Registration[]>;
    cancel(id: string, userId: string): Promise<{
        message: string;
    }>;
}
