import type { Relation } from 'typeorm';
import { User } from '../users/user.entity.js';
import { Event } from '../events/event.entity.js';
export declare class Registration {
    id: string;
    user: Relation<User>;
    event: Relation<Event>;
    createdAt: Date;
}
