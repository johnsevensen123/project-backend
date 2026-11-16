import { Repository } from 'typeorm';
import { Event } from './event.entity.js';
import { CreateEventDto } from './dto/create-event.dto.js';
import { UpdateEventDto } from './dto/update-event.dto.js';
export declare class EventsService {
    private readonly eventRepository;
    constructor(eventRepository: Repository<Event>);
    private validateEventDates;
    create(createEventDto: CreateEventDto, userId: string): Promise<Event>;
    findAll(userId: string): Promise<Event[]>;
    findOne(id: string, userId: string): Promise<Event>;
    update(id: string, updateEventDto: UpdateEventDto, userId: string): Promise<Event>;
    remove(id: string, userId: string): Promise<{
        message: string;
    }>;
}
