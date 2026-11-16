import type { Relation } from 'typeorm';
import { Event } from '../events/event.entity.js';
import { Registration } from '../registrations/registration.entity.js';
export declare class User {
    id: string;
    email: string;
    password: string;
    name: string;
    events: Relation<Event[]>;
    registrations: Relation<Registration[]>;
}
