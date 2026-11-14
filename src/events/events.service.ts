import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Event } from './event.entity.js';
import { User } from '../users/user.entity.js';
import { CreateEventDto } from './dto/create-event.dto.js';
import { UpdateEventDto } from './dto/update-event.dto.js';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {}

  private validateEventDates(
    startDate: string | Date,
    endDate: string | Date,
  ) {
    if (new Date(startDate).getTime() >= new Date(endDate).getTime()) {
      throw new BadRequestException(
        'La date de fin doit être postérieure à la date de début',
      );
    }
  }

  async create(createEventDto: CreateEventDto, userId: string) {
    this.validateEventDates(createEventDto.startDate, createEventDto.endDate);

    const event = this.eventRepository.create({
      ...createEventDto,
      owner: { id: userId } as User,
    });

    return this.eventRepository.save(event);
  }

  async findAll(userId: string) {
    return this.eventRepository
      .createQueryBuilder('event')
      .leftJoin('event.owner', 'owner')
      .addSelect('owner.id')
      .where('owner.id = :userId', { userId })
      .getMany();
  }

  async findOne(id: string, userId: string) {
    const event = await this.eventRepository
      .createQueryBuilder('event')
      .leftJoin('event.owner', 'owner')
      .addSelect('owner.id')
      .where('event.id = :id AND owner.id = :userId', { id, userId })
      .getOne();

    if (!event) {
      throw new NotFoundException('Événement introuvable');
    }

    return event;
  }

  async update(
    id: string,
    updateEventDto: UpdateEventDto,
    userId: string,
  ) {
    if (Object.keys(updateEventDto).length === 0) {
  throw new BadRequestException(
    'Vous devez fournir au moins un champ à modifier',
  );
}
    const event = await this.findOne(id, userId);

    const startDate = updateEventDto.startDate ?? event.startDate;
    const endDate = updateEventDto.endDate ?? event.endDate;

    this.validateEventDates(startDate, endDate);

    Object.assign(event, updateEventDto);

    return this.eventRepository.save(event);
  }

  async remove(id: string, userId: string) {
    const event = await this.findOne(id, userId);

    await this.eventRepository.remove(event);

    return {
      message: 'Événement supprimé avec succès',
    };
  }
}