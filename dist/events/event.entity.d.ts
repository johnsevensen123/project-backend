import type { Relation } from 'typeorm';
import { User } from '../users/user.entity.js';
import { Registration } from '../registrations/registration.entity.js';
export declare class Event {
    id: string;
    title: string;
    description: string;
    startDate: Date;
    endDate: Date;
    location: string;
    capacity: number;
    owner: Relation<User>;
    registrations: Relation<Registration[]>;
    createdAt: Date;
}
