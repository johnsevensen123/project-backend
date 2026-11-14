import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Registration } from './registration.entity.js';
import { Event } from '../events/event.entity.js';
import { User } from '../users/user.entity.js';

@Injectable()
export class RegistrationsService {
  constructor(
    @InjectRepository(Registration)
    private readonly registrationRepository: Repository<Registration>,

    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {}

  async register(eventId: string, userId: string) {
    const event = await this.eventRepository.findOne({
      where: { id: eventId },
    });

    if (!event) {
      throw new NotFoundException('Événement introuvable');
    }

    const existingRegistration =
      await this.registrationRepository.findOne({
        where: {
          user: { id: userId },
          event: { id: eventId },
        },
      });

    if (existingRegistration) {
      throw new ConflictException(
        'Vous êtes déjà inscrit à cet événement',
      );
    }

    const registrationCount =
      await this.registrationRepository.count({
        where: { event: { id: eventId } },
      });

    if (registrationCount >= event.capacity) {
      throw new BadRequestException(
        'La capacité maximale de cet événement est atteinte',
      );
    }

    const registration = this.registrationRepository.create({
      user: { id: userId } as User,
      event: { id: eventId } as Event,
    });
    return this.registrationRepository.save(registration);
  }

  async findAll(userId: string) {
    return this.registrationRepository.find({
      where: {
        user: { id: userId },
      },
      relations: {
        event: true,
      },
    });
  }

  async cancel(id: string, userId: string) {
    const registration = await this.registrationRepository.findOne({
      where: {
        id,
        user: { id: userId },
      },
    });

    if (!registration) {
      throw new NotFoundException('Inscription introuvable');
    }

    await this.registrationRepository.remove(registration);

    return {
      message: 'Inscription annulée avec succès',
    };
  }
}

