var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Injectable, NotFoundException, BadRequestException, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './event.entity.js';
let EventsService = class EventsService {
    eventRepository;
    constructor(eventRepository) {
        this.eventRepository = eventRepository;
    }
    validateEventDates(startDate, endDate) {
        if (new Date(startDate).getTime() >= new Date(endDate).getTime()) {
            throw new BadRequestException('La date de fin doit être postérieure à la date de début');
        }
    }
    async create(createEventDto, userId) {
        this.validateEventDates(createEventDto.startDate, createEventDto.endDate);
        const event = this.eventRepository.create({
            ...createEventDto,
            owner: { id: userId },
        });
        return this.eventRepository.save(event);
    }
    async findAll(userId) {
        return this.eventRepository
            .createQueryBuilder('event')
            .leftJoin('event.owner', 'owner')
            .addSelect('owner.id')
            .where('owner.id = :userId', { userId })
            .getMany();
    }
    async findOne(id, userId) {
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
    async update(id, updateEventDto, userId) {
        if (Object.keys(updateEventDto).length === 0) {
            throw new BadRequestException('Vous devez fournir au moins un champ à modifier');
        }
        const event = await this.findOne(id, userId);
        const startDate = updateEventDto.startDate ?? event.startDate;
        const endDate = updateEventDto.endDate ?? event.endDate;
        this.validateEventDates(startDate, endDate);
        Object.assign(event, updateEventDto);
        return this.eventRepository.save(event);
    }
    async remove(id, userId) {
        const event = await this.findOne(id, userId);
        await this.eventRepository.remove(event);
        return {
            message: 'Événement supprimé avec succès',
        };
    }
};
EventsService = __decorate([
    Injectable(),
    __param(0, InjectRepository(Event)),
    __metadata("design:paramtypes", [Repository])
], EventsService);
export { EventsService };
//# sourceMappingURL=events.service.js.map